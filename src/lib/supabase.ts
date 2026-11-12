import { createClient, SupabaseClient } from "@supabase/supabase-js";

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
  } catch (err: any) {
    console.error("[SUPABASE INIT ERROR]:", err.message);
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

export type PersistenceResult<T = Record<string, any>> = {
  success: boolean;
  isDuplicate: boolean;
  errorCode?: "DATABASE_UNAVAILABLE" | "DUPLICATE_REGISTRATION" | "TRANSACTION_FAILED";
  message?: string;
  data?: T;
};

/**
 * Persists an early access lead strictly to Supabase PostgreSQL.
 * Guarantees duplicate email rejection via PostgreSQL unique constraint (code 23505).
 * Does NOT fake success or fallback to ephemeral /tmp storage.
 */
export async function persistEarlyAccessLead(
  record: EarlyAccessRecord
): Promise<PersistenceResult<{ id: string; referenceId: string; createdAt: string }>> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    console.error(
      "[DATABASE CRITICAL]: Supabase is not configured. SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in Netlify environment variables."
    );
    return {
      success: false,
      isDuplicate: false,
      errorCode: "DATABASE_UNAVAILABLE",
      message: "The registration system is temporarily undergoing database setup. Please try again shortly.",
    };
  }

  try {
    const { data, error } = await supabase
      .from("early_access_leads")
      .insert({
        reference_id: record.referenceId,
        full_name: record.fullName,
        email: record.email.toLowerCase(),
        country: record.country,
        user_type: record.userType,
        device_model: record.deviceModel,
        intended_use: record.intendedUse,
        consent_given: true,
        client_ip_masked: record.clientIpMasked,
      })
      .select("id, reference_id, created_at")
      .single();

    if (error) {
      // PostgreSQL Error Code 23505: unique_violation
      if (
        error.code === "23505" ||
        error.message.toLowerCase().includes("unique") ||
        error.message.toLowerCase().includes("duplicate")
      ) {
        return {
          success: false,
          isDuplicate: true,
          errorCode: "DUPLICATE_REGISTRATION",
          message: "An early access application with this email address has already been recorded in our test cohort registry.",
        };
      }

      console.error("[SUPABASE INSERT FAILED]:", error.message, `(Code: ${error.code})`);
      return {
        success: false,
        isDuplicate: false,
        errorCode: "TRANSACTION_FAILED",
        message: "Unable to process application due to a database transaction failure. Please try again later.",
      };
    }

    return {
      success: true,
      isDuplicate: false,
      data: {
        id: data.id,
        referenceId: data.reference_id,
        createdAt: data.created_at,
      },
    };
  } catch (err: any) {
    console.error("[SUPABASE UNEXPECTED EXCEPTION]:", err.message);
    return {
      success: false,
      isDuplicate: false,
      errorCode: "TRANSACTION_FAILED",
      message: "An unexpected error occurred while communicating with the database.",
    };
  }
}

/**
 * Persists an enterprise / partner contact inquiry strictly to Supabase PostgreSQL.
 * Does NOT fake success or fallback to ephemeral /tmp storage.
 */
export async function persistContactInquiry(
  record: ContactRecord
): Promise<PersistenceResult<{ id: string; ticketId: string; createdAt: string }>> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    console.error(
      "[DATABASE CRITICAL]: Supabase is not configured. SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in Netlify environment variables."
    );
    return {
      success: false,
      isDuplicate: false,
      errorCode: "DATABASE_UNAVAILABLE",
      message: "The inquiry dispatch system is temporarily undergoing database setup. Please try again shortly or contact support directly.",
    };
  }

  try {
    const { data, error } = await supabase
      .from("contact_inquiries")
      .insert({
        ticket_id: record.ticketId,
        name: record.name,
        email: record.email.toLowerCase(),
        organization: record.organization,
        inquiry_type: record.inquiryType,
        message: record.message,
        client_ip_masked: record.clientIpMasked,
      })
      .select("id, ticket_id, created_at")
      .single();

    if (error) {
      console.error("[SUPABASE CONTACT INSERT FAILED]:", error.message, `(Code: ${error.code})`);
      return {
        success: false,
        isDuplicate: false,
        errorCode: "TRANSACTION_FAILED",
        message: "Failed to record inquiry in database. Please try again later.",
      };
    }

    return {
      success: true,
      isDuplicate: false,
      data: {
        id: data.id,
        ticketId: data.ticket_id,
        createdAt: data.created_at,
      },
    };
  } catch (err: any) {
    console.error("[SUPABASE CONTACT UNEXPECTED EXCEPTION]:", err.message);
    return {
      success: false,
      isDuplicate: false,
      errorCode: "TRANSACTION_FAILED",
      message: "An unexpected error occurred while transmitting your inquiry.",
    };
  }
}
