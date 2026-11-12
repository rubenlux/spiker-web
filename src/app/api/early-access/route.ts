import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimitAsync,
  sanitizeInput,
  hashClientIdentifier,
  maskIpAddress,
} from "@/lib/rateLimit";
import { persistEarlyAccessLead } from "@/lib/supabase";

const MAX_PAYLOAD_BYTES = 50 * 1024; // 50 KB

export async function POST(req: NextRequest) {
  try {
    // 1. Verify Content-Type header
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        {
          success: false,
          message: "Unsupported Media Type. Request body must be application/json.",
        },
        {
          status: 415,
          headers: {
            "X-Content-Type-Options": "nosniff",
          },
        }
      );
    }

    // 2. Enforce maximum payload size limit (50 KB)
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
      return NextResponse.json(
        {
          success: false,
          message: "Payload Too Large. Maximum allowed submission size is 50KB.",
        },
        {
          status: 413,
          headers: {
            "X-Content-Type-Options": "nosniff",
          },
        }
      );
    }

    // 3. Client IP extraction & privacy hashing for rate limiting
    const rawIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const anonymizedHash = hashClientIdentifier(rawIp);

    // 4. Distributed / in-memory rate limiting: max 5 submissions per minute
    const rateLimit = await checkRateLimitAsync(`early-access:${anonymizedHash}`, 5, 60 * 1000);
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
            "X-Content-Type-Options": "nosniff",
          },
        }
      );
    }

    // 5. Parse & sanitize inputs
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON request payload." },
        { status: 400, headers: { "X-Content-Type-Options": "nosniff" } }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Request payload must be a valid JSON object." },
        { status: 400, headers: { "X-Content-Type-Options": "nosniff" } }
      );
    }

    const fullName = sanitizeInput(body.fullName, 100);
    const emailRaw = sanitizeInput(body.email, 120);
    const country = sanitizeInput(body.country, 100);
    const userTypeRaw = sanitizeInput(body.userType, 50);
    const deviceModel = sanitizeInput(body.deviceModel, 100);
    const intendedUse = sanitizeInput(body.intendedUse, 500);
    const consent = Boolean(body.consent);

    // 6. Validation
    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { success: false, message: "A valid full name (minimum 2 characters) is required." },
        { status: 400, headers: { "X-Content-Type-Options": "nosniff" } }
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRaw || !emailRegex.test(emailRaw)) {
      return NextResponse.json(
        { success: false, message: "A valid email address is required (e.g. name@domain.com)." },
        { status: 400, headers: { "X-Content-Type-Options": "nosniff" } }
      );
    }

    if (!country || country.length < 2) {
      return NextResponse.json(
        { success: false, message: "Operating country or geographic region is required." },
        { status: 400, headers: { "X-Content-Type-Options": "nosniff" } }
      );
    }

    const validUserTypes = ["personal", "business", "partner", "organization"];
    const userType = validUserTypes.includes(userTypeRaw) ? userTypeRaw : "personal";

    if (!consent) {
      return NextResponse.json(
        { success: false, message: "Consent to early access testing terms is mandatory." },
        { status: 400, headers: { "X-Content-Type-Options": "nosniff" } }
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
      clientIpMasked: maskIpAddress(rawIp),
    };

    // 7. Persistence & duplicate detection (Strict Supabase PostgreSQL)
    const dbResult = await persistEarlyAccessLead(record);

    if (!dbResult.success) {
      if (dbResult.isDuplicate) {
        return NextResponse.json(
          {
            success: false,
            isDuplicate: true,
            message:
              dbResult.message ||
              "An early access application with this email address has already been recorded in our test cohort registry.",
          },
          { status: 409, headers: { "X-Content-Type-Options": "nosniff" } }
        );
      }

      const statusCode = dbResult.errorCode === "DATABASE_UNAVAILABLE" ? 503 : 500;
      return NextResponse.json(
        {
          success: false,
          errorCode: dbResult.errorCode,
          message: dbResult.message || "Unable to record application. Please try again later.",
        },
        { status: statusCode, headers: { "X-Content-Type-Options": "nosniff" } }
      );
    }

    const confirmedReferenceId = dbResult.data?.referenceId || referenceId;
    console.log(
      `[SPIKER EARLY ACCESS LEAD STORED IN POSTGRESQL]: ${confirmedReferenceId} - ${email} (${userType})`
    );

    // 8. Configurable Webhook Forwarding (fires ONLY after successful DB storage)
    let webhookStatus: "DELIVERED" | "FAILED" | "NOT_CONFIGURED" = "NOT_CONFIGURED";
    const webhookUrl = process.env.EARLY_ACCESS_WEBHOOK_URL;

    if (webhookUrl && webhookUrl.startsWith("http")) {
      try {
        const webhookRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...record, referenceId: confirmedReferenceId }),
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
        referenceId: confirmedReferenceId,
        webhookStatus,
        message:
          "Early access application successfully validated and permanently stored in database registry.",
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
      { status: 500, headers: { "X-Content-Type-Options": "nosniff" } }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Method Not Allowed. Submissions must use POST." },
    { status: 405, headers: { Allow: "POST", "X-Content-Type-Options": "nosniff" } }
  );
}
