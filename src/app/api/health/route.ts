import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json(
      {
        status: "DEGRADED",
        database: "UNCONFIGURED",
        message: "Supabase credentials are not present in server environment.",
      },
      { status: 503 }
    );
  }

  try {
    // 1. SELECT query test on early_access_leads table
    const { count: leadsCount, error: leadsError } = await supabase
      .from("early_access_leads")
      .select("*", { count: "exact", head: true });

    if (leadsError) {
      console.error("[HEALTH CHECK ERROR - early_access_leads]:", leadsError.message);
      return NextResponse.json(
        {
          status: "ERROR",
          table: "early_access_leads",
          message: leadsError.message,
        },
        { status: 500 }
      );
    }

    // 2. SELECT query test on contact_inquiries table
    const { count: contactCount, error: contactError } = await supabase
      .from("contact_inquiries")
      .select("*", { count: "exact", head: true });

    if (contactError) {
      console.error("[HEALTH CHECK ERROR - contact_inquiries]:", contactError.message);
      return NextResponse.json(
        {
          status: "ERROR",
          table: "contact_inquiries",
          message: contactError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        status: "HEALTHY",
        database: "SUPABASE_POSTGRESQL_VERIFIED",
        tables: {
          early_access_leads: {
            exists: true,
            accessible: true,
            rowCount: leadsCount,
          },
          contact_inquiries: {
            exists: true,
            accessible: true,
            rowCount: contactCount,
          },
        },
        checkedAt: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  } catch (err: any) {
    console.error("[HEALTH CHECK EXCEPTION]:", err.message);
    return NextResponse.json(
      { status: "ERROR", message: "Health check query failed" },
      { status: 500 }
    );
  }
}
