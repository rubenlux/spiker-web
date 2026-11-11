import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");

function ensureDirectoryExists() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.error("[DATASTORE ERROR] Failed to create .data directory:", err);
  }
}

export function saveEarlyAccessLead(lead: Record<string, any>): { isDuplicate: boolean; saved: boolean } {
  ensureDirectoryExists();
  const filePath = path.join(DATA_DIR, "early-access-leads.json");

  try {
    let existingLeads: any[] = [];
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8");
      existingLeads = JSON.parse(content || "[]");
    }

    // Check for duplicate submission by email
    const duplicate = existingLeads.find(
      (item) => item.email?.toLowerCase() === lead.email?.toLowerCase()
    );

    if (duplicate) {
      return { isDuplicate: true, saved: false };
    }

    existingLeads.push(lead);
    fs.writeFileSync(filePath, JSON.stringify(existingLeads, null, 2), "utf8");
    return { isDuplicate: false, saved: true };
  } catch (err) {
    console.error("[DATASTORE ERROR] Failed to save early access lead:", err);
    return { isDuplicate: false, saved: false };
  }
}

export function saveContactInquiry(inquiry: Record<string, any>): boolean {
  ensureDirectoryExists();
  const filePath = path.join(DATA_DIR, "contact-inquiries.json");

  try {
    let existing: any[] = [];
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8");
      existing = JSON.parse(content || "[]");
    }

    existing.push(inquiry);
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("[DATASTORE ERROR] Failed to save contact inquiry:", err);
    return false;
  }
}

