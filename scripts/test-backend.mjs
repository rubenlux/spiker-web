// Automated Backend Validation Suite for SPIKER API Endpoints & Data Persistence
import fs from "fs";
import path from "path";
import { checkRateLimit, sanitizeString } from "../src/lib/rateLimit.ts";
import { saveEarlyAccessLead, saveContactInquiry } from "../src/lib/datastore.ts";

async function runTestSuite() {
  console.log("=================================================");
  console.log("   SPIKER PHASE 2 - BACKEND AUTOMATED AUDIT SUITE");
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

  // TEST SUITE 3: Datastore Local Persistence & Lead Storage
  console.log("\n--- 3. Datastore Lead Storage & Duplication Handling ---");
  const testEmail = `tester-${Date.now()}@spiker.example`;
  const lead1 = {
    referenceId: `TEST-REF-${Date.now()}-1`,
    fullName: "Elena Rostova",
    email: testEmail,
    country: "Switzerland",
    userType: "personal",
    deviceModel: "Google Pixel 8 Pro",
    intendedUse: "Alpine hiking evaluation",
    registeredAt: new Date().toISOString(),
    clientIpMasked: "192.168.***.***",
  };

  const saveRes1 = saveEarlyAccessLead(lead1);
  assert(saveRes1.saved === true, "Lead 1 successfully saved to local JSON datastore");
  assert(saveRes1.isDuplicate === false, "Lead 1 is recognized as a fresh registration");

  // Duplicate submission with same email
  const leadDuplicate = {
    ...lead1,
    referenceId: `TEST-REF-${Date.now()}-2`,
  };
  const saveRes2 = saveEarlyAccessLead(leadDuplicate);
  assert(saveRes2.isDuplicate === true, "Duplicate lead with identical email is flagged as duplicate");
  assert(saveRes2.saved === false, "Duplicate lead does not corrupt registry with duplicates");

  // TEST SUITE 4: Contact Inquiry Persistence
  console.log("\n--- 4. Contact Inquiries Persistence ---");
  const inquiry = {
    ticketId: `INQ-TEST-${Date.now()}`,
    name: "Dr. Marcus Vance",
    email: "marcus@disaster-response.org",
    organization: "Civil Relief Corps",
    inquiryType: "enterprise",
    message: "Requesting field evaluation guidelines for humanitarian response teams.",
    submittedAt: new Date().toISOString(),
    clientIpMasked: "10.0.***.***",
  };

  const contactSaved = saveContactInquiry(inquiry);
  assert(contactSaved === true, "Contact inquiry successfully appended to inquiries datastore");

  // Verify file write exists on disk
  const datastoreDir = path.resolve(process.cwd(), ".data");
  const leadsFile = path.join(datastoreDir, "early-access-leads.json");
  const inquiriesFile = path.join(datastoreDir, "contact-inquiries.json");

  assert(fs.existsSync(leadsFile), "early-access-leads.json exists on filesystem");
  assert(fs.existsSync(inquiriesFile), "contact-inquiries.json exists on filesystem");

  const rawLeads = fs.readFileSync(leadsFile, "utf-8");
  assert(rawLeads.includes(testEmail), "Persisted leads file contains verified test email");

  // TEST SUITE 5: Supabase SQL Schema & Migration Verification
  console.log("\n--- 5. Supabase SQL Schema & Security Rules ---");
  const migrationPath = path.resolve(process.cwd(), "supabase/migrations/20260212000000_create_spiker_tables.sql");
  assert(fs.existsSync(migrationPath), "Migration SQL file exists in supabase/migrations/");

  const sqlContent = fs.readFileSync(migrationPath, "utf-8");
  assert(sqlContent.includes("CREATE TABLE IF NOT EXISTS public.early_access_leads"), "SQL defines early_access_leads table");
  assert(sqlContent.includes("CREATE TABLE IF NOT EXISTS public.contact_inquiries"), "SQL defines contact_inquiries table");
  assert(sqlContent.includes("idx_early_access_leads_email_unique"), "SQL includes case-insensitive unique email index");
  assert(sqlContent.includes("ENABLE ROW LEVEL SECURITY"), "SQL enforces Row Level Security (RLS) on all tables");
  assert(sqlContent.includes("pgcrypto"), "SQL enables pgcrypto extension for gen_random_uuid()");

  // TEST SUITE 6: Netlify Configuration Verification
  console.log("\n--- 6. Netlify Configuration & Next.js 15 Adapter ---");
  const netlifyTomlPath = path.resolve(process.cwd(), "netlify.toml");
  assert(fs.existsSync(netlifyTomlPath), "netlify.toml exists in root");

  const tomlContent = fs.readFileSync(netlifyTomlPath, "utf-8");
  assert(tomlContent.includes("@netlify/plugin-nextjs"), "netlify.toml configures @netlify/plugin-nextjs adapter");
  assert(tomlContent.includes("X-Frame-Options"), "netlify.toml configures global security headers");
  assert(tomlContent.includes("command = \"npm run build\""), "netlify.toml defines npm run build build command");

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

