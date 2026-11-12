import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json(
      {
        status: "degraded",
        services: {
          web: "healthy",
          datastore: "unavailable",
        },
        checkedAt: new Date().toISOString(),
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  }

  try {
    // 1. Verify SELECT access on early_access_leads
    const { error: leadsError } = await supabase
      .from("early_access_leads")
      .select("id", { count: "exact", head: true });

    if (leadsError) {
      console.error("[HEALTH CHECK ERROR]: Datastore query check failed on leads:", leadsError.message);
      return NextResponse.json(
        {
          status: "degraded",
          services: {
            web: "healthy",
            datastore: "unavailable",
          },
          checkedAt: new Date().toISOString(),
        },
        {
          status: 503,
          headers: {
            "Cache-Control": "no-store, max-age=0",
            "X-Content-Type-Options": "nosniff",
          },
        }
      );
    }

    // 2. Verify SELECT access on contact_inquiries
    const { error: contactError } = await supabase
      .from("contact_inquiries")
      .select("id", { count: "exact", head: true });

    if (contactError) {
      console.error("[HEALTH CHECK ERROR]: Datastore query check failed on contacts:", contactError.message);
      return NextResponse.json(
        {
          status: "degraded",
          services: {
            web: "healthy",
            datastore: "unavailable",
          },
          checkedAt: new Date().toISOString(),
        },
        {
          status: 503,
          headers: {
            "Cache-Control": "no-store, max-age=0",
            "X-Content-Type-Options": "nosniff",
          },
        }
      );
    }

    // Hardened Public Response:
    // Does NOT reveal internal row counts, table names, or database technology details.
    return NextResponse.json(
      {
        status: "operational",
        services: {
          web: "healthy",
          datastore: "healthy",
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
    console.error("[HEALTH CHECK UNEXPECTED EXCEPTION]:", err.message);
    return NextResponse.json(
      {
        status: "degraded",
        services: {
          web: "healthy",
          datastore: "unavailable",
        },
        checkedAt: new Date().toISOString(),
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store, max-age=0",
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { message: "Method Not Allowed. Health probes must use GET." },
    { status: 405, headers: { Allow: "GET", "X-Content-Type-Options": "nosniff" } }
  );
}

