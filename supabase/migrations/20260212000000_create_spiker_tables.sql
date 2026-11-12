-- ====================================================================
-- SPIKER PLATFORM - SUPABASE POSTGRESQL SCHEMA MIGRATION
-- Project: SPIKER Offline Communication Platform
-- Version: 1.0.0
-- Tables: early_access_leads, contact_inquiries
-- Security: Row Level Security (RLS) enabled with strict service-role isolation
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TABLE: early_access_leads
-- Records beta cohort applicant profiles with duplicate email prevention
CREATE TABLE IF NOT EXISTS public.early_access_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    country TEXT NOT NULL,
    user_type TEXT NOT NULL DEFAULT 'personal' CHECK (user_type IN ('personal', 'business', 'partner', 'organization')),
    device_model TEXT DEFAULT 'Standard Android',
    intended_use TEXT DEFAULT 'General off-grid testing',
    consent_given BOOLEAN NOT NULL DEFAULT true,
    client_ip_masked TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'waitlisted', 'invited')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for early_access_leads
-- Case-insensitive unique index to guarantee no duplicate email registrations
CREATE UNIQUE INDEX IF NOT EXISTS idx_early_access_leads_email_unique 
    ON public.early_access_leads (LOWER(email));

CREATE INDEX IF NOT EXISTS idx_early_access_leads_reference_id 
    ON public.early_access_leads (reference_id);

CREATE INDEX IF NOT EXISTS idx_early_access_leads_created_at 
    ON public.early_access_leads (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_early_access_leads_user_type 
    ON public.early_access_leads (user_type);

-- 3. TABLE: contact_inquiries
-- Records enterprise, OEM partnership, and developer inquiries
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    organization TEXT DEFAULT 'Independent',
    inquiry_type TEXT NOT NULL DEFAULT 'enterprise' CHECK (inquiry_type IN ('enterprise', 'partnership', 'support', 'press')),
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'responded', 'archived')),
    client_ip_masked TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for contact_inquiries
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_email 
    ON public.contact_inquiries (LOWER(email));

CREATE INDEX IF NOT EXISTS idx_contact_inquiries_ticket_id 
    ON public.contact_inquiries (ticket_id);

CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at 
    ON public.contact_inquiries (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status 
    ON public.contact_inquiries (status);

-- 4. ROW LEVEL SECURITY (RLS)
-- Crucial Security Policy: Deny public/anon access entirely.
-- Only the backend Next.js API using SUPABASE_SERVICE_ROLE_KEY can read and write.
ALTER TABLE public.early_access_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Note: Without any public permissive policies, default RLS blocks all anon/authenticated client requests.
-- The service_role key automatically bypasses RLS, securing all customer data server-side.

-- 5. AUTOMATIC updated_at TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_early_access_leads_updated_at ON public.early_access_leads;
CREATE TRIGGER tr_early_access_leads_updated_at
    BEFORE UPDATE ON public.early_access_leads
    FOR EACH ROW
    EXECUTE FUNCTION public.set_current_timestamp_updated_at();

DROP TRIGGER IF EXISTS tr_contact_inquiries_updated_at ON public.contact_inquiries;
CREATE TRIGGER tr_contact_inquiries_updated_at
    BEFORE UPDATE ON public.contact_inquiries
    FOR EACH ROW
    EXECUTE FUNCTION public.set_current_timestamp_updated_at();

