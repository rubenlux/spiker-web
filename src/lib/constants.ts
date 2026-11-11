import { FaqItem, UseCaseItem, CapabilityItem } from "./types";

export const SITE_CONFIG = {
  name: "SPIKER",
  tagline: "Communication without Internet.",
  headline: "Stay connected when the world goes offline.",
  description:
    "SPIKER is an emerging offline communication platform designed to enable nearby compatible smartphones to communicate directly using Bluetooth and Wi-Fi Direct technologies, without requiring cellular networks or Internet connectivity.",
  url: "https://spiker.network",
  ogImage: "/images/hero/hero-phones-3d.jpg",
  links: {
    technology: "/technology",
    useCases: "/use-cases",
    enterprise: "/enterprise",
    earlyAccess: "/early-access",
    about: "/about",
    privacy: "/privacy",
    contact: "/contact",
  },
};

export const NAV_LINKS = [
  { href: "/#product-experience", label: "Experience" },
  { href: "/technology", label: "Technology" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/enterprise", label: "Enterprise" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
];

export const PROBLEM_CARDS = [
  {
    code: "01 // GATEWAY LOSS",
    title: "Internet Outage",
    status: "SERVER ROUTE UNAVAILABLE",
    description:
      "Cloud messaging backends become completely unreachable. Standard apps freeze and cannot route payloads once remote authentication gateways or public DNS servers fail to respond.",
    icon: "CloudOff",
  },
  {
    code: "02 // RADIO BLACKOUT",
    title: "Zero Cellular Coverage",
    status: "BASE TOWER OUT OF RANGE",
    description:
      "Remote canyons, wilderness trails, subterranean facilities, and dense concrete structures lack cell signals, leaving team members isolated despite close physical proximity.",
    icon: "Radio",
  },
  {
    code: "03 // NETWORK SATURATION",
    title: "Grid & Tower Disruptions",
    status: "CARRIER BAND SATURATED",
    description:
      "Severe weather events, power grid cutoffs, and dense crowd congestion in stadiums exhaust cell tower capacities, causing dropped packets and delayed critical messages.",
    icon: "ZapOff",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Discover",
    sub: "Bluetooth Low Energy (BLE)",
    description:
      "When the app is active or in discovery mode, compatible devices emit low-energy beacons. Nearby peers discover each other locally and populate a device directory without cloud phonebook queries.",
    detail: "RF beaconing concept without centralized directory lookups.",
    icon: "Radar",
  },
  {
    step: "02",
    title: "Connect",
    sub: "Autonomous Peer Handshake",
    description:
      "When initiating a conversation, compatible devices negotiate an ad-hoc local socket directly between their wireless chipsets.",
    detail: "Direct device-to-device socket negotiation target.",
    icon: "Shuffle",
  },
  {
    step: "03",
    title: "Communicate",
    sub: "Direct Local Payload Transport",
    description:
      "Text messages and data payloads transfer directly across local radio channels between participating hardware chipsets.",
    detail: "Physical radio acknowledgment receipt concept.",
    icon: "Wifi",
  },
];

export const USE_CASES_DATA: UseCaseItem[] = [
  {
    id: "emergency",
    title: "Emergency Preparedness",
    domain: "RESCUE & RESILIENCE",
    badge: "PREPAREDNESS",
    description:
      "When hurricanes, earthquakes, or municipal grid disruptions knock down cell towers, maintain local coordination between family members, community volunteers, and civilian aid squads within radio range.",
    icon: "AlertTriangle",
    features: [
      "Neighborhood radio check-in",
      "Cell-tower independent alerts",
      "Immediate proximity awareness",
    ],
  },
  {
    id: "outdoor",
    title: "Backcountry & Expeditions",
    domain: "OUTDOOR & TRAILS",
    badge: "EXPEDITION",
    description:
      "Hikers, mountaineering parties, and trail runners coordinate across valley segments, base camps, and ridge lines beyond cellular reach without carrying bulky radio hardware.",
    icon: "Compass",
    features: [
      "Trail group proximity monitoring",
      "Direct offline map coordinate sharing",
      "Zero roaming costs in wild zones",
    ],
  },
  {
    id: "industrial",
    title: "Industrial & Shielded Facilities",
    domain: "SHIELDED ENVIRONMENTS",
    badge: "INDUSTRIAL",
    description:
      "Tunnels, deep subterranean storage, cargo ships, and reinforced industrial facilities where high-frequency cellular signals cannot penetrate concrete walls or steel bulkheads.",
    icon: "Factory",
    features: [
      "Direct room-to-room link",
      "Steel bulkhead penetration via ad-hoc radios",
      "No external infrastructure wiring",
    ],
  },
  {
    id: "events",
    title: "Dense Events & Festivals",
    domain: "BANDWIDTH SATURATION",
    badge: "CONGESTION",
    description:
      "Large-scale music festivals, sporting arenas, and public conventions where thousands of active mobile devices overwhelm cellular towers and prevent standard apps from sending messages.",
    icon: "Users",
    features: [
      "Bypasses congested commercial cell towers",
      "Direct peer proximity communication",
      "Battery-conscious standby design",
    ],
  },
  {
    id: "rural",
    title: "Off-Grid & Rural Communities",
    domain: "RURAL INFRASTRUCTURE",
    badge: "OFF-GRID",
    description:
      "Rural homesteads, agricultural collectives, and research outposts situated far outside commercial cable, fiber, or reliable cell coverage stay in close daily contact.",
    icon: "Home",
    features: [
      "Direct property-wide messaging",
      "Zero monthly data subscriptions",
      "Independent decentralized autonomy",
    ],
  },
  {
    id: "humanitarian",
    title: "Humanitarian & Field Teams",
    domain: "CRISIS MISSIONS",
    badge: "FIELD RELIEF",
    description:
      "First responders, medical volunteers, and disaster relief NGOs deploy and coordinate rapid response teams on the ground in regions with damaged telecommunication systems.",
    icon: "HeartPulse",
    features: [
      "Immediate field squad dispatching",
      "No satellite airtime fees for local links",
      "Rapid deployment on consumer smartphones",
    ],
  },
];

export const CAPABILITY_MATRIX: CapabilityItem[] = [
  {
    title: "Validated in Internal Prototypes",
    stage: "CURRENT",
    stageLabel: "VERIFIED IN BENCHMARK PROTOTYPES",
    stageColor: "text-secondary-container border-secondary-container/30 bg-secondary-container/10",
    description:
      "Demonstrated under laboratory and bench-testing conditions on select compatible Android test hardware:",
    items: [
      "Peer discovery via Bluetooth Low Energy (BLE) advertisement packets on supported Android devices.",
      "Direct 1-to-1 offline text messaging prototype across local radio link.",
      "Ad-hoc Wi-Fi Direct socket negotiation between compatible test devices in proximity.",
      "Local-first message storage with RF packet delivery state tracking in local device database.",
    ],
  },
  {
    title: "In Active Engineering",
    stage: "DEVELOPMENT",
    stageLabel: "UNDER ACTIVE DEVELOPMENT",
    stageColor: "text-primary border-primary/30 bg-primary/10",
    description:
      "Currently in active development, automated protocol testing, and stability optimization:",
    items: [
      "Local cluster group messaging protocol for small operational teams.",
      "Low-bandwidth compressed audio transmission over direct local radio sockets.",
      "Automated session reconnect algorithms after temporary physical line-of-sight drop.",
      "Cross-platform research investigating iOS background execution constraints and interoperability.",
    ],
  },
  {
    title: "Research & Long-Term Design",
    stage: "EXPLORATION",
    stageLabel: "RESEARCH PHASE",
    stageColor: "text-on-surface-variant border-outline-variant/30 bg-surface-container-high",
    description:
      "Architectural studies and early protocol exploration for future revisions:",
    items: [
      "Multi-hop mesh relay protocols across intermediate peer hops to extend effective geographical range.",
      "Standardized offline emergency SOS radio beacon format for open receiver interoperability.",
      "Public developer SDKs and library bindings for third-party off-grid applications.",
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "Does SPIKER require Internet access or cellular coverage?",
    answer:
      "No. SPIKER is designed to operate directly over the internal Bluetooth and Wi-Fi Direct radios on compatible smartphones. When operating offline, data does not traverse telecommunication gateways, satellite networks, or public DNS servers.",
  },
  {
    id: "faq-2",
    question: "How does SPIKER work offline?",
    answer:
      "SPIKER combines two complementary wireless radios: Bluetooth Low Energy emits small, energy-efficient beacon signals that let nearby devices find each other in standby. When a transmission occurs, the devices establish an autonomous, peer-to-peer Wi-Fi Direct socket directly across the air to transfer text, coordinates, or audio payloads without an external router.",
  },
  {
    id: "faq-3",
    question: "Does SPIKER use Bluetooth?",
    answer:
      "Yes. Bluetooth Low Energy (BLE) is utilized for discovery and proximity sensing. Its minimal power draw allows the app to detect compatible peers nearby without rapidly draining phone batteries.",
  },
  {
    id: "faq-4",
    question: "What is Wi-Fi Direct?",
    answer:
      "Wi-Fi Direct is a standard wireless protocol that allows two devices to form a direct high-speed Wi-Fi connection with each other without needing a wireless router, access point, or Internet connection.",
  },
  {
    id: "faq-5",
    question: "Can SPIKER work without cellular coverage?",
    answer:
      "Yes. Cellular network service is not required for local peer-to-peer radio communication. Compatible devices within direct physical radio range can communicate even in airplane mode (with Wi-Fi and Bluetooth enabled) or in deep remote areas.",
  },
  {
    id: "faq-6",
    question: "Which devices are supported?",
    answer:
      "Development prototypes target Android smartphones running Android 8.0 or newer with hardware support for BLE Peripheral/Central modes and Wi-Fi Direct. We are actively researching iOS background execution models to understand cross-platform interoperability boundaries.",
  },
  {
    id: "faq-7",
    question: "How far can devices communicate?",
    answer:
      "Real-world communication distance is governed by radio physics. In open outdoor line-of-sight conditions, reliable ranges often reach 50 to 90 meters. Indoors through walls, reinforced concrete, or crowded environments, range is attenuated according to standard 2.4 GHz and 5 GHz radio propagation characteristics.",
  },
  {
    id: "faq-8",
    question: "Is SPIKER available yet?",
    answer:
      "SPIKER is currently in private development testing cohorts and is not yet publicly released on app stores. You can request early access on this website to participate in upcoming Android prototype testing rounds.",
  },
  {
    id: "faq-9",
    question: "Can organizations use SPIKER?",
    answer:
      "Yes. Organizations operating in mining, industrial, outdoor, or emergency disaster environments can apply for targeted pilot testing cohorts to evaluate offline peer coordination in their specific physical facilities.",
  },
];
