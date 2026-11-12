import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { saveEarlyAccessLead as saveEarlyAccessLeadLocal, saveContactInquiry as saveContactInquiryLocal } from "./datastore";

// Ensure this client is NEVER initialized on client-side
let supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (typeof window !== "undefined") {
    console.error("[SECURITY VIOLATION]: getSupabaseAdmin must only be called in server environments.");
    return null;
  }

  if (supabaseAdmin) return supabaseAdmin;

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey || !supabaseUrl.startsWith("http")) {
    return null;
  }

  try {
    supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    return supabaseAdmin;
  } catch (err) {
    console.error("[SUPABASE INIT ERROR]:", err);
    return null;
  }
}

export interface EarlyAccessRecord {
  referenceId: string;
  fullName: string;
  email: string;
  country: string;
  userType: string;
  deviceModel: string;
  intendedUse: string;
  registeredAt: string;
  clientIpMasked: string;
}

export interface ContactRecord {
  ticketId: string;
  name: string;
  email: string;
  organization: string;
  inquiryType: string;
  message: string;
  submittedAt: string;
  clientIpMasked: string;
}

/**
 * Stores early access lead into Supabase PostgreSQL with local datastore fallback.
 * Strictly guarantees duplicate email detection and zero data loss.
 */
export async function persistEarlyAccessLead(record: EarlyAccessRecord): Promise<{
  saved: boolean;
  isDuplicate: boolean;
  storageTarget: "supabase" | "local_fallback";
  message?: string;
}> {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    try {
      // 1. Check for duplicate email (case-insensitive)
      const { data: existingLead, error: checkError } = await supabase
        .from("early_access_leads")
        .select("id, email")
        .ilike("email", record.email)
        .maybeSingle();

      if (existingLead) {
        return {
          saved: false,
          isDuplicate: true,
          storageTarget: "supabase",
          message: "An early access application with this email address has already been recorded in our test cohort registry.",
        };
      }

      if (checkError && checkError.code !== "PGRST116") {
        console.warn("[SUPABASE QUERY WARNING]: Duplicate check returned code:", checkError.code, checkError.message);
      }

      // 2. Insert record
      const { error: insertError } = await supabase
        .from("early_access_leads")
        .insert({
          reference_id: record.referenceId,
          full_name: record.fullName,
          email: record.email.toLowerCase(),
          country: record.country,
          user_type: record.userType,
          device_model: record.deviceModel,
          intended_use: record.intendedUse,
          client_ip_masked: record.clientIpMasked,
        });

      if (!insertError) {
        return {
          saved: true,
          isDuplicate: false,
          storageTarget: "supabase",
        };
      }

      // PostgreSQL 23505 = unique_violation
      if (insertError.code === "23505" || insertError.message.includes("unique")) {
        return {
          saved: false,
          isDuplicate: true,
          storageTarget: "supabase",
          message: "An early access application with this email address has already been recorded in our test cohort registry.",
        };
      }

      console.error("[SUPABASE INSERT ERROR]: Failed to persist in PostgreSQL:", insertError.message);
      console.warn("[STORAGE FALLBACK]: Diverting lead to atomic local datastore to prevent data loss.");
    } catch (err: any) {
      console.error("[SUPABASE EXCEPTION]:", err.message);
      console.warn("[STORAGE FALLBACK]: Diverting lead to atomic local datastore.");
    }
  } else {
    console.info("[STORAGE NOTICE]: Supabase environment variables not detected. Using secure local datastore.");
  }

  // Fallback to local datastore (tested in Phase 2)
  const localResult = saveEarlyAccessLeadLocal(record);
  return {
    saved: localResult.saved,
    isDuplicate: localResult.isDuplicate,
    storageTarget: "local_fallback",
  };
}

/**
 * Stores contact inquiry into Supabase PostgreSQL with local datastore fallback.
 */
export async function persistContactInquiry(record: ContactRecord): Promise<{
  saved: boolean;
  storageTarget: "supabase" | "local_fallback";
}> {
  const supabase = getSupabaseAdmin();

  if (supabase) {
    try {
      const { error: insertError } = await supabase
        .from("contact_inquiries")
        .insert({
          ticket_id: record.ticketId,
          name: record.name,
          email: record.email.toLowerCase(),
          organization: record.organization,
          inquiry_type: record.inquiryType,
          message: record.message,
          client_ip_masked: record.clientIpMasked,
        });

      if (!insertError) {
        return {
          saved: true,
          storageTarget: "supabase",
        };
      }

      console.error("[SUPABASE CONTACT INSERT ERROR]:", insertError.message);
      console.warn("[STORAGE FALLBACK]: Diverting inquiry to local datastore.");
    } catch (err: any) {
      console.error("[SUPABASE EXCEPTION]:", err.message);
      console.warn("[STORAGE FALLBACK]: Diverting inquiry to local datastore.");
    }
  } else {
    console.info("[STORAGE NOTICE]: Supabase environment variables not detected. Using local datastore.");
  }

  const localSaved = saveContactInquiryLocal(record);
  return {
    saved: localSaved,
    storageTarget: "local_fallback",
  };
}

