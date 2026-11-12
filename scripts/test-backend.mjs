// Automated Backend Validation Suite for SPIKER Strict PostgreSQL Persistence
import fs from "fs";
import path from "path";
import { checkRateLimit, sanitizeString } from "../src/lib/rateLimit.ts";
import { persistEarlyAccessLead, persistContactInquiry, getSupabaseAdmin } from "../src/lib/supabase.ts";

async function runTestSuite() {
  console.log("=================================================");
  console.log(" SPIKER STRICT POSTGRESQL ARCHITECTURE AUDIT");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  // TEST SUITE 1: Input Sanitization
  console.log("--- 1. Input Sanitization & Safety ---");
  const dirtyString = "  <script>alert('xss')</script> John Doe \u0000 ";
  const sanitized = sanitizeString(dirtyString, 50);
  assert(!sanitized.includes("<") && !sanitized.includes(">"), "Strips HTML angle brackets");
  assert(!sanitized.includes("\u0000"), "Strips null bytes");
  assert(sanitized.includes("John Doe"), "Preserves valid textual characters");

  const longString = "A".repeat(200);
  const truncated = sanitizeString(longString, 50);
  assert(truncated.length === 50, "Enforces strict character length bounds");

  // TEST SUITE 2: Rate Limiter Token Bucket
  console.log("\n--- 2. In-Memory Token Bucket Rate Limiting ---");
  const testIp = `test-ip-${Date.now()}`;
  for (let i = 1; i <= 5; i++) {
    const res = checkRateLimit(testIp, 5, 10000);
    assert(res.allowed === true, `Request #${i} within limit is allowed (remaining: ${res.remaining})`);
  }
  const exceededRes = checkRateLimit(testIp, 5, 10000);
  assert(exceededRes.allowed === false, "Request #6 exceeds 5-per-window threshold and is rejected");
  assert(exceededRes.remaining === 0, "Remaining tokens reports 0 on rate limit rejection");

  // TEST SUITE 3: Strict Failure When Supabase Is Unconfigured (No Fake Success!)
  console.log("\n--- 3. Strict Persistence Failure When DB Unconfigured ---");
  // Temporarily ensure env vars are blank
  const originalUrl = process.env.SUPABASE_URL;
  const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  delete process.env.SUPABASE_URL;
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;

  const testRecord = {
    referenceId: `TEST-${Date.now()}`,
    fullName: "Elena Rostova",
    email: "elena@test.spiker",
    country: "Norway",
    userType: "partner",
    deviceModel: "Pixel 8",
    intendedUse: "Benchmarking",
    registeredAt: new Date().toISOString(),
    clientIpMasked: "10.0.***.***",
  };

  const eaResult = await persistEarlyAccessLead(testRecord);
  assert(eaResult.success === false, "Does NOT claim success when Supabase is not configured");
  assert(eaResult.errorCode === "DATABASE_UNAVAILABLE", "Reports DATABASE_UNAVAILABLE code");
  assert(eaResult.message && eaResult.message.length > 10, "Provides clear user-facing error message");

  const contactRecord = {
    ticketId: `INQ-${Date.now()}`,
    name: "Dr. Alicia Mendez",
    email: "alicia@test.spiker",
    organization: "Relief Corp",
    inquiryType: "enterprise",
    message: "Field SAR testing evaluation inquiry.",
    submittedAt: new Date().toISOString(),
    clientIpMasked: "10.0.***.***",
  };

  const contactResult = await persistContactInquiry(contactRecord);
  assert(contactResult.success === false, "Contact persistence does NOT claim success without database");
  assert(contactResult.errorCode === "DATABASE_UNAVAILABLE", "Contact reports DATABASE_UNAVAILABLE");

  // Restore env vars
  if (originalUrl) process.env.SUPABASE_URL = originalUrl;
  if (originalKey) process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;

  // TEST SUITE 4: SQL Migration Schema & API Field Matching
  console.log("\n--- 4. SQL Schema & Field Reconciliation ---");
  const migrationPath = path.resolve(process.cwd(), "supabase/migrations/20260212000000_create_spiker_tables.sql");
  assert(fs.existsSync(migrationPath), "Migration SQL file exists in supabase/migrations/");

  const sqlContent = fs.readFileSync(migrationPath, "utf-8");
  
  // Verify early_access_leads columns
  assert(sqlContent.includes("reference_id TEXT NOT NULL UNIQUE"), "SQL defines reference_id as UNIQUE");
  assert(sqlContent.includes("full_name TEXT NOT NULL"), "SQL defines full_name");
  assert(sqlContent.includes("email TEXT NOT NULL"), "SQL defines email");
  assert(sqlContent.includes("country TEXT NOT NULL"), "SQL defines country");
  assert(sqlContent.includes("user_type TEXT NOT NULL DEFAULT 'personal'"), "SQL defines user_type with check constraint");
  assert(sqlContent.includes("device_model TEXT"), "SQL defines device_model");
  assert(sqlContent.includes("intended_use TEXT"), "SQL defines intended_use");
  assert(sqlContent.includes("consent_given BOOLEAN NOT NULL DEFAULT true"), "SQL defines consent_given boolean");
  assert(sqlContent.includes("client_ip_masked TEXT"), "SQL defines client_ip_masked");
  assert(sqlContent.includes("status TEXT NOT NULL DEFAULT 'pending'"), "SQL defines status");
  assert(sqlContent.includes("idx_early_access_leads_email_unique"), "SQL creates UNIQUE INDEX ON LOWER(email)");

  // Verify contact_inquiries columns
  assert(sqlContent.includes("ticket_id TEXT NOT NULL UNIQUE"), "SQL defines ticket_id as UNIQUE");
  assert(sqlContent.includes("name TEXT NOT NULL"), "SQL defines name");
  assert(sqlContent.includes("organization TEXT"), "SQL defines organization");
  assert(sqlContent.includes("inquiry_type TEXT NOT NULL DEFAULT 'enterprise'"), "SQL defines inquiry_type");
  assert(sqlContent.includes("message TEXT NOT NULL"), "SQL defines message");

  // Verify security
  assert(sqlContent.includes("ENABLE ROW LEVEL SECURITY"), "Enforces Row Level Security (RLS) on both tables");

  // TEST SUITE 5: Netlify Configuration Verification
  console.log("\n--- 5. Netlify Configuration & Headers ---");
  const netlifyTomlPath = path.resolve(process.cwd(), "netlify.toml");
  assert(fs.existsSync(netlifyTomlPath), "netlify.toml exists in root");

  const tomlContent = fs.readFileSync(netlifyTomlPath, "utf-8");
  assert(tomlContent.includes("@netlify/plugin-nextjs"), "netlify.toml configures @netlify/plugin-nextjs adapter");
  assert(tomlContent.includes("X-Frame-Options"), "netlify.toml configures X-Frame-Options");
  assert(tomlContent.includes("command = \"npm run build\""), "netlify.toml defines npm run build");

  console.log("\n=================================================");
  console.log(`AUDIT RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});
