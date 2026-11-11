# SPIKER — Official Website
> **Communication without Internet.**  
> *"Stay connected when the world goes offline."*

Official international technology platform website for **SPIKER**, an innovative offline communication application enabling nearby compatible devices to communicate directly using Bluetooth and Wi-Fi Direct technologies—without requiring cellular networks or Internet connectivity.

---

## 1. Project Overview & Architecture

Built as a high-performance, production-ready website following the approved **Google Stitch** design system (**Spiker Quantum Mesh**), embodying a dark futuristic technology aesthetic with midnight navy surfaces (`#080D18`), electric blue (`#3478F6`), and laser cyan (`#00D5FF`) luminous accents.

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19, Tailwind CSS, Lucide React, Framer Motion
- **Language**: Strict TypeScript
- **Typography**: Space Grotesk (Headlines/Display), Inter (Body), JetBrains Mono (Telemetry/Labels)
- **Deployment Platform**: Vercel ready

---

## 2. Implemented Routes

| Route | Purpose | Status |
|---|---|---|
| `/` | Main marketing experience with all 14 core sections | Production Ready (Static) |
| `/technology` | In-depth technical RF protocol & packet architecture | Production Ready (Static) |
| `/use-cases` | Detailed real-world operational scenarios & matrix | Production Ready (Static) |
| `/enterprise` | Business, industrial & institutional pilot solutions | Production Ready (Static) |
| `/early-access` | Dedicated early access tester cohort registration | Production Ready (Static) |
| `/about` | Company mission, principles & local-first philosophy | Production Ready (Static) |
| `/privacy` | Transparent local data sovereignty architecture | Production Ready (Static) |
| `/contact` | Official inquiries, partnerships & support contact | Production Ready (Static) |
| `/api/early-access` | Validated lead collection API endpoint | Production Ready (Dynamic API) |
| `/api/contact` | Enterprise and partnership inquiries endpoint | Production Ready (Dynamic API) |
| `/sitemap.xml` | Dynamic SEO sitemap covering all routes | Production Ready (Static XML) |
| `/robots.txt` | Crawler policy and sitemap reference | Production Ready (Static TXT) |

---

## 3. Homepage Section Architecture

1. **Header**: Sticky navigation, precision vector brand logo, desktop links, FAQ link, Early Access CTA with cyan rim glow, accessible mobile drawer (tested down to 360px).
2. **Hero**: Headline, live architecture protocol badge, radio telemetry strip (BLE, Wi-Fi Direct, Zero Server Dependency), dual CTAs, high-res hardware composition with overlaid HUD telemetry badges.
3. **Product Experience**: Studio product mockups, Proximity Peer Discovery card (-64 dBm indicator), Direct Ad-Hoc Radio Socket card (Stream 0x9AF4), Radio Delivery Status chat simulation (Physical ACK).
4. **The Problem**: 3 failure mode cards (Internet Outage, Zero Cellular Coverage, Grid & Tower Disruptions).
5. **The Solution**: Interactive peer-to-peer RF dataflow schematic (Device A &rarr; BLE Discovery &rarr; Direct Radio Socket &rarr; Broadband Transfer &rarr; Device B).
6. **How SPIKER Works**: 3 stages (01 Discover [BLE], 02 Connect [Local Handshake], 03 Communicate [Wi-Fi Direct]), plus "Why Two Radios Instead of One?" radio engineering explainer.
7. **Technology**: Comparative cards for Bluetooth LE vs. Wi-Fi Direct, plus layered protocol architecture stack (L1 Physical RF to L4 App UI).
8. **Use Cases**: 6 operational scenario cards (Emergency Preparedness, Backcountry & Expeditions, Industrial & Underground, Dense Events & Festivals, Off-Grid Homesteads, Humanitarian Relief).
9. **Capability Matrix**: Honest 3-tier status matrix (Currently Implemented, In Active Development, Future Possibilities) with explicit physical RF reality notice.
10. **Privacy**: 4 core data sovereignty pillars (Local-First Storage, Zero Central Servers, Ephemeral Radio Beacons, Absolute Stealth Mode Control).
11. **Enterprise**: Enterprise fleet solutions, technology partnerships, pilot programs, and pilot consultation CTA.
12. **Early Access**: Functional registration form with pathway segment selectors (Personal, Business, Technology Partner), field validation, privacy consent, and lead submission handling.
13. **Technical FAQ**: Accessible accordion with 9 truthful, physics-based answers to key hardware questions.
14. **Footer**: Official SPIKER brand mark, mission tagline, platform navigation, protocol diagnostics HUD, and copyright.

---

## 4. Environment Variables

Create a `.env.local` file or configure these variables in your Vercel project settings:

```env
# Optional external webhook endpoint for Early Access registration leads (Zapier, Make, Slack, Customer.io)
EARLY_ACCESS_WEBHOOK_URL=https://your-webhook-endpoint.com/api/leads

# Optional external webhook endpoint for Enterprise & Contact inquiries
CONTACT_WEBHOOK_URL=https://your-webhook-endpoint.com/api/contact

# Canonical site URL
NEXT_PUBLIC_SITE_URL=https://spiker.network
```

*Note: If no webhook URL is configured, both API routes gracefully record and validate submissions on the server, returning structured JSON confirmations with unique reference IDs (`SPK-...`).*

---

## 5. Local Development & Verification

### Install Dependencies
```bash
npm install
```

### Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### Run Production Build & Typecheck
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

---

## 6. Vercel Deployment Instructions

1. Push your repository to GitHub, GitLab, or Bitbucket:
   ```bash
   git add .
   git commit -m "feat: complete SPIKER official website implementation"
   git push origin main
   ```
2. Navigate to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import the `spiker-web` repository.
4. Framework preset will automatically detect **Next.js**.
5. Add environment variables under **"Environment Variables"** (`EARLY_ACCESS_WEBHOOK_URL`, `CONTACT_WEBHOOK_URL`).
6. Click **"Deploy"**. Vercel will build and deploy the production static pages and serverless API endpoints instantly.

---

## 7. Technical Claim Verification Report

To maintain absolute credibility as an international technology startup, the website strictly distinguishes between verified physical realities and speculative claims:

- **Verified & Implemented**:
  - Direct device discovery via Bluetooth Low Energy beacons.
  - 1-to-1 offline text messaging over local radios.
  - Wi-Fi Direct ad-hoc socket negotiation without external routers.
  - Local-first message storage on physical device memory.
  - Transmission acknowledgment indicators (RF delivery vs awaiting peer).
- **In Development**:
  - Encrypted small-cluster group channels.
  - Low-bandwidth compressed voice notes.
  - Automatic reconnection after physical line-of-sight drop.
  - iOS background radio interoperability research.
- **Future Possibilities**:
  - Multi-hop mesh relaying across intermediate hops.
  - Standardized emergency SOS broadcast beacons.
  - Public developer SDKs.
- **Physical RF Reality Disclosed**: Range is explicitly stated as line-of-sight dependent (~50-90m outdoors), subject to RF attenuation through reinforced concrete, metal structures, and local interference. No impossible claims (such as multi-mile smartphone Bluetooth range without relays) are made.

