import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, organization, inquiryType, message } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "A valid name is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, message: "Please enter a detailed message (minimum 5 characters)." },
        { status: 400 }
      );
    }

    const lead = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      organization: (organization || "Independent").trim(),
      inquiryType: inquiryType || "enterprise",
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    console.log("[SPIKER CONTACT INQUIRY RECEIVED]:", lead);

    const contactWebhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (contactWebhookUrl) {
      try {
        await fetch(contactWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        });
      } catch (webhookErr) {
        console.error("[SPIKER CONTACT WEBHOOK ERROR]:", webhookErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received by the SPIKER solutions team.",
        ticketId: `SPK-INQ-${Date.now().toString(36).toUpperCase()}`,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[SPIKER CONTACT API ERROR]:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
