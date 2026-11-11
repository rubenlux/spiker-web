import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, country, userType, deviceModel, intendedUse, consent } = body;

    // Strict validation
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "A valid full name (minimum 2 characters) is required." },
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

    if (!country || typeof country !== "string") {
      return NextResponse.json(
        { success: false, message: "Country / Operating Region is required." },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { success: false, message: "Consent to early access testing terms is mandatory." },
        { status: 400 }
      );
    }

    const record = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      country: country.trim(),
      userType: userType || "personal",
      deviceModel: (deviceModel || "Not specified").trim(),
      intendedUse: (intendedUse || "Not specified").trim(),
      registeredAt: new Date().toISOString(),
      userAgent: req.headers.get("user-agent") || "unknown",
    };

    console.log("[SPIKER EARLY ACCESS LEAD RECEIVED]:", record);

    // Optional external webhook integration (e.g. Zapier, Make, Slack, Customer.io, Hubspot)
    const webhookUrl = process.env.EARLY_ACCESS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        const webhookRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(record),
        });
        if (!webhookRes.ok) {
          console.warn("[SPIKER LEAD WEBHOOK WARNING]: External webhook returned status", webhookRes.status);
        }
      } catch (webhookErr) {
        console.error("[SPIKER LEAD WEBHOOK ERROR]:", webhookErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Early access application successfully recorded.",
        referenceId: `SPK-${Date.now().toString(36).toUpperCase()}`,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("[SPIKER EARLY ACCESS API ERROR]:", err);
    return NextResponse.json(
      { success: false, message: "Internal server processing error. Please try again." },
      { status: 500 }
    );
  }
}
