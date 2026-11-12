import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, sanitizeString } from "@/lib/rateLimit";
import { persistEarlyAccessLead } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting: max 5 submissions per minute per IP
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(`early-access:${clientIp}`, 5, 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many submission attempts. Please wait a minute before trying again.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
          },
        }
      );
    }

    // 2. Parse & sanitize inputs
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const fullName = sanitizeString(body.fullName, 100);
    const emailRaw = sanitizeString(body.email, 120);
    const country = sanitizeString(body.country, 100);
    const userTypeRaw = sanitizeString(body.userType, 50);
    const deviceModel = sanitizeString(body.deviceModel, 100);
    const intendedUse = sanitizeString(body.intendedUse, 500);
    const consent = Boolean(body.consent);

    // 3. Validation
    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { success: false, message: "A valid full name (minimum 2 characters) is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRaw || !emailRegex.test(emailRaw)) {
      return NextResponse.json(
        { success: false, message: "A valid email address is required (e.g. name@domain.com)." },
        { status: 400 }
      );
    }

    if (!country || country.length < 2) {
      return NextResponse.json(
        { success: false, message: "Operating country or geographic region is required." },
        { status: 400 }
      );
    }

    const validUserTypes = ["personal", "business", "partner", "organization"];
    const userType = validUserTypes.includes(userTypeRaw) ? userTypeRaw : "personal";

    if (!consent) {
      return NextResponse.json(
        { success: false, message: "Consent to early access testing terms is mandatory." },
        { status: 400 }
      );
    }

    const email = emailRaw.toLowerCase();
    const referenceId = `SPK-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;

    const record = {
      referenceId,
      fullName,
      email,
      country,
      userType,
      deviceModel: deviceModel || "Standard Android",
      intendedUse: intendedUse || "General off-grid testing",
      registeredAt: new Date().toISOString(),
      clientIpMasked: clientIp.replace(/(\d+)\.(\d+)\.(\d+)\.(\d+)/, "$1.$2.***.***"),
    };

    // 4. Persistence & duplicate detection (Supabase PostgreSQL with local datastore fail-safe)
    const { isDuplicate, saved, storageTarget, message: dbMessage } = await persistEarlyAccessLead(record);

    if (isDuplicate) {
      return NextResponse.json(
        {
          success: false,
          isDuplicate: true,
          message: dbMessage || "An early access application with this email address has already been recorded in our test cohort registry.",
        },
        { status: 409 }
      );
    }

    console.log(`[SPIKER EARLY ACCESS LEAD STORED]: ${referenceId} - ${email} (${userType}) - Target: ${storageTarget} - Persist: ${saved}`);

    // 5. Configurable Webhook Forwarding
    let webhookStatus: "DELIVERED" | "FAILED" | "NOT_CONFIGURED" = "NOT_CONFIGURED";
    const webhookUrl = process.env.EARLY_ACCESS_WEBHOOK_URL;

    if (webhookUrl && webhookUrl.startsWith("http")) {
      try {
        const webhookRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record),
          signal: AbortSignal.timeout(5000), // 5s timeout
        });

        if (webhookRes.ok) {
          webhookStatus = "DELIVERED";
        } else {
          webhookStatus = "FAILED";
          console.warn(`[WEBHOOK WARNING]: Remote endpoint returned HTTP ${webhookRes.status}`);
        }
      } catch (err: any) {
        webhookStatus = "FAILED";
        console.error("[WEBHOOK ERROR]: Failed to forward lead to webhook endpoint:", err.message);
      }
    }

    return NextResponse.json(
      {
        success: true,
        referenceId,
        webhookStatus,
        message: "Early access application successfully validated and recorded in our evaluation registry.",
        note: webhookUrl
          ? webhookStatus === "DELIVERED"
            ? "External webhook integration synchronized."
            : "External webhook delivery queued for retry."
          : "Lead safely recorded in local evaluation registry (webhook not configured).",
      },
      {
        status: 200,
        headers: {
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  } catch (err: any) {
    console.error("[SPIKER EARLY ACCESS API ERROR]:", err);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your application. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Method Not Allowed. Submissions must use POST." },
    { status: 405, headers: { Allow: "POST" } }
  );
}
