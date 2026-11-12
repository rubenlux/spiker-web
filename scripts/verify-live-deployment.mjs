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

  // 3. Early Access API Submission
  console.log("\n--- 3. Testing Early Access API (/api/early-access) ---");
  const uniqueEmail = `qa-audit-${Date.now()}@spiker.test`;
  const eaPayload = {
    fullName: "QA Live Validation Engineer",
    email: uniqueEmail,
    country: "Spain",
    deviceModel: "Google Pixel 8 Pro",
    userType: "partner",
    intendedUse: "Netlify production build link-layer validation",
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

  // 4. Contact Form API Submission
  console.log("\n--- 4. Testing Contact Inquiries API (/api/contact) ---");
  const contactPayload = {
    name: "Dr. Alicia Mendez",
    email: "alicia.mendez@disaster-response.org",
    organization: "International Rescue Unit",
    inquiryType: "enterprise",
    message: "Verifying live Netlify function submission for emergency radio evaluations.",
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

