// Verification suite for live deployment at https://spiker-web.netlify.app
const BASE_URL = "https://spiker-web.netlify.app";

async function verifyDeployment() {
  console.log("=================================================");
  console.log(` SPIKER LIVE DEPLOYMENT SMOKE TEST: ${BASE_URL}`);
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, testName, extraInfo = "") {
    if (condition) {
      console.log(`[PASS] ${testName} ${extraInfo}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName} ${extraInfo}`);
      failed++;
    }
  }

  // 1. Informational Routes Verification
  const routes = [
    { path: "/", name: "Homepage Landing Page" },
    { path: "/technology", name: "Technology & Radio PHY" },
    { path: "/use-cases", name: "Operational Use Cases" },
    { path: "/enterprise", name: "Enterprise & OEM Cohorts" },
    { path: "/early-access", name: "Early Access Registration Page" },
    { path: "/about", name: "About & Decentralized Vision" },
    { path: "/privacy", name: "Local Privacy Architecture" },
    { path: "/contact", name: "Enterprise Contact Form Page" },
    { path: "/robots.txt", name: "SEO robots.txt" },
    { path: "/sitemap.xml", name: "SEO sitemap.xml" },
  ];

  console.log("--- 1. Testing Core Routes & Assets ---");
  for (const r of routes) {
    try {
      const res = await fetch(`${BASE_URL}${r.path}`);
      const text = await res.text();
      assert(res.status === 200, `Route ${r.path} (${r.name})`, `-> HTTP ${res.status} (${text.length} bytes)`);
    } catch (e) {
      assert(false, `Route ${r.path}`, `-> Exception: ${e.message}`);
    }
  }

  // 2. Global Security Headers Verification
  console.log("\n--- 2. Global Security & CDN Headers ---");
  try {
    const homeRes = await fetch(`${BASE_URL}/`);
    const xfo = homeRes.headers.get("x-frame-options");
    const xcto = homeRes.headers.get("x-content-type-options");
    const hsts = homeRes.headers.get("strict-transport-security");
    assert(xfo === "DENY", "X-Frame-Options: DENY is active");
    assert(xcto === "nosniff", "X-Content-Type-Options: nosniff is active");
    assert(Boolean(hsts), "HSTS (Strict-Transport-Security) header present");
  } catch (e) {
    assert(false, "Security headers probe failed", e.message);
  }

  // 3. Health Endpoint Verification
  console.log("\n--- 3. Testing Health Endpoint (/api/health) ---");
  try {
    const healthRes = await fetch(`${BASE_URL}/api/health`);
    const healthJson = await healthRes.json();
    assert(healthRes.status === 200, "GET /api/health responds with 200 OK");
    assert(healthJson.status === "operational", "Health status reports operational");
    assert(healthJson.services?.web === "healthy" && healthJson.services?.datastore === "healthy", "Services report healthy");
    assert(!healthJson.tableName && !healthJson.count, "Health does NOT expose internal table names or row counts");

    const healthPost = await fetch(`${BASE_URL}/api/health`, { method: "POST" });
    assert(healthPost.status === 405, "POST /api/health returns 405 Method Not Allowed");
  } catch (e) {
    assert(false, "Health endpoint probe exception", e.message);
  }

  // 4. API Security Hardening Checks (415 Media Type, 413 Payload Limit, 405 Method Rejection)
  console.log("\n--- 4. Testing API Security Guards (415, 413, 405) ---");
  try {
    // 415 Unsupported Media Type
    const resBadType = await fetch(`${BASE_URL}/api/early-access`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "not-json",
    });
    assert(resBadType.status === 415, "POST /api/early-access rejects non-JSON Content-Type with 415");

    // 413 Payload Too Large (send > 50KB)
    const largeBody = JSON.stringify({ fullName: "X".repeat(60000) });
    const resOversized = await fetch(`${BASE_URL}/api/early-access`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: largeBody,
    });
    assert(resOversized.status === 413, "POST /api/early-access rejects payload > 50KB with 413");

    // 405 Method Not Allowed on GET
    const resGetEA = await fetch(`${BASE_URL}/api/early-access`);
    assert(resGetEA.status === 405, "GET /api/early-access returns 405 Method Not Allowed");

    const resGetContact = await fetch(`${BASE_URL}/api/contact`);
    assert(resGetContact.status === 405, "GET /api/contact returns 405 Method Not Allowed");
  } catch (e) {
    assert(false, "API security guard test exception", e.message);
  }

  // 5. Early Access API Valid Submission & Duplicate Rejection
  console.log("\n--- 5. Testing Early Access Live Supabase Persistence ---");
  const uniqueEmail = `qa-audit-${Date.now()}@spiker.test`;
  const eaPayload = {
    fullName: "QA Phase 3.3 Security Auditor",
    email: uniqueEmail,
    country: "Switzerland",
    deviceModel: "Google Pixel 8 Pro",
    userType: "partner",
    intendedUse: "Phase 3.3 live production verification and security audit",
    consent: true,
  };

  try {
    const resEA = await fetch(`${BASE_URL}/api/early-access`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eaPayload),
    });
    const dataEA = await resEA.json();
    assert(resEA.status === 200 && dataEA.success === true, "POST /api/early-access valid submission", `-> HTTP ${resEA.status}, Ref: ${dataEA.referenceId}`);

    // Duplicate test
    const resDup = await fetch(`${BASE_URL}/api/early-access`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eaPayload),
    });
    const dataDup = await resDup.json();
    assert(resDup.status === 409 && dataDup.isDuplicate === true, "POST /api/early-access duplicate rejection", `-> HTTP ${resDup.status} (Duplicate: ${dataDup.isDuplicate})`);
  } catch (e) {
    assert(false, "Early Access API live test exception", e.message);
  }

  // 6. Contact Form API Submission
  console.log("\n--- 6. Testing Contact Inquiries Live Supabase Persistence ---");
  const contactPayload = {
    name: "Dr. Alicia Mendez",
    email: `alicia.mendez-${Date.now()}@disaster-response.org`,
    organization: "International Rescue Unit",
    inquiryType: "enterprise",
    message: "Verifying live Netlify function submission with hardened Phase 3.3 security headers.",
  };

  try {
    const resContact = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactPayload),
    });
    const dataContact = await resContact.json();
    assert(resContact.status === 200 && dataContact.success === true, "POST /api/contact submission", `-> HTTP ${resContact.status}, Ticket: ${dataContact.ticketId}`);
  } catch (e) {
    assert(false, "Contact API live test exception", e.message);
  }

  console.log("\n=================================================");
  console.log(`LIVE SMOKE TEST RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

verifyDeployment();
