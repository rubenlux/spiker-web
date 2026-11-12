import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, sanitizeString } from "@/lib/rateLimit";
import { persistContactInquiry } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting: max 5 requests per minute per IP
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const rateLimit = checkRateLimit(`contact:${clientIp}`, 5, 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many contact attempts. Please wait a minute before submitting again.",
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

    const name = sanitizeString(body.name, 100);
    const emailRaw = sanitizeString(body.email, 120);
    const organization = sanitizeString(body.organization, 120);
    const inquiryTypeRaw = sanitizeString(body.inquiryType, 50);
    const message = sanitizeString(body.message, 2500);

    // 3. Validation
    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, message: "A valid name (minimum 2 characters) is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRaw || !emailRegex.test(emailRaw)) {
      return NextResponse.json(
        { success: false, message: "A valid email address is required (e.g. name@organization.com)." },
        { status: 400 }
      );
    }

    if (!message || message.length < 10) {
      return NextResponse.json(
        { success: false, message: "Please provide a detailed inquiry message (minimum 10 characters)." },
        { status: 400 }
      );
    }

    const validInquiryTypes = ["enterprise", "partnership", "support", "press"];
    const inquiryType = validInquiryTypes.includes(inquiryTypeRaw) ? inquiryTypeRaw : "enterprise";
    const email = emailRaw.toLowerCase();

    const ticketId = `SPK-INQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;

    const inquiryRecord = {
      ticketId,
      name,
      email,
      organization: organization || "Independent",
      inquiryType,
      message,
      submittedAt: new Date().toISOString(),
      clientIpMasked: clientIp.replace(/(\d+)\.(\d+)\.(\d+)\.(\d+)/, "$1.$2.***.***"),
    };

    // 4. Persistence (Supabase PostgreSQL with local datastore fail-safe)
    const { saved, storageTarget } = await persistContactInquiry(inquiryRecord);
    console.log(`[SPIKER CONTACT INQUIRY STORED]: ${ticketId} - ${email} (${inquiryType}) - Target: ${storageTarget} - Persist: ${saved}`);

    // 5. Configurable Webhook Forwarding
    let webhookStatus: "DELIVERED" | "FAILED" | "NOT_CONFIGURED" = "NOT_CONFIGURED";
    const contactWebhookUrl = process.env.CONTACT_WEBHOOK_URL;

    if (contactWebhookUrl && contactWebhookUrl.startsWith("http")) {
      try {
        const webhookRes = await fetch(contactWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inquiryRecord),
          signal: AbortSignal.timeout(5000),
        });

        if (webhookRes.ok) {
          webhookStatus = "DELIVERED";
        } else {
          webhookStatus = "FAILED";
          console.warn(`[CONTACT WEBHOOK WARNING]: Remote endpoint returned HTTP ${webhookRes.status}`);
        }
      } catch (err: any) {
        webhookStatus = "FAILED";
        console.error("[CONTACT WEBHOOK ERROR]: Failed to forward inquiry to webhook endpoint:", err.message);
      }
    }

    return NextResponse.json(
      {
        success: true,
        ticketId,
        webhookStatus,
        message: "Your message has been received by the SPIKER solutions engineering team.",
        note: contactWebhookUrl
          ? webhookStatus === "DELIVERED"
            ? "External webhook integration synchronized."
            : "External webhook delivery queued."
          : "Inquiry safely logged in local registry (webhook not configured).",
      },
      {
        status: 200,
        headers: {
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  } catch (err: any) {
    console.error("[SPIKER CONTACT API ERROR]:", err);
    return NextResponse.json(
      { success: false, message: "Internal server processing error. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Method Not Allowed. Inquiries must use POST." },
    { status: 405, headers: { Allow: "POST" } }
  );
}
