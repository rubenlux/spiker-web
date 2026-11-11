import { FaqItem, UseCaseItem, CapabilityItem } from "./types";

export const SITE_CONFIG = {
  name: "SPIKER",
  tagline: "Communication without Internet.",
  headline: "Stay connected when the world goes offline.",
  description:
    "SPIKER is an offline communication platform engineered to enable nearby compatible smartphones to communicate directly using Bluetooth and Wi-Fi Direct technologies, without requiring cellular networks or Internet connectivity.",
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
      "When SPIKER is open or running in passive search mode, devices emit low-energy beacons. Nearby peers discover each other automatically and populate a real-time local proximity directory.",
    detail: "Direct RF beaconing without cloud phonebook queries.",
    icon: "Radar",
  },
  {
    step: "02",
    title: "Connect",
    sub: "Autonomous Peer Handshake",
    description:
      "When you initiate a conversation or select a discovered contact, compatible devices negotiate an ad-hoc local socket directly between their wireless chipsets.",
    detail: "Zero intermediary router or access point required.",
    icon: "Shuffle",
  },
  {
    step: "03",
    title: "Communicate",
    sub: "High-Speed Wi-Fi Direct Transport",
    description:
      "Payloads—including text messages, offline coordinate markers, and compressed voice notes—transmit over an ad-hoc Wi-Fi Direct link at broadband speeds.",
    detail: "Physical radio acknowledgment receipt indicators.",
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
      "When hurricanes, earthquakes, or municipal grid disruptions knock down cell towers, maintain hyper-local coordination between family members, community volunteers, and civilian aid squads within radio range.",
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
      "Instant 1-to-1 friend location pinging",
      "Battery-efficient BLE standby",
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
    title: "Currently Implemented",
    stage: "CURRENT",
    stageLabel: "VERIFIED IN INTERNAL BUILDS",
    stageColor: "text-secondary-container border-secondary-container/30 bg-secondary-container/10",
    description:
      "Fully operational and verified under laboratory and physical test conditions on supported Android hardware:",
    items: [
      "Direct peer discovery via Bluetooth Low Energy (BLE) background advertising and scanning.",
      "Local 1-to-1 offline text messaging between paired compatible phones.",
      "Ad-hoc Wi-Fi Direct socket negotiation without external routers or mobile hotspots.",
      "Local-first message storage with physical RF transmission delivery status indicators.",
    ],
  },
  {
    title: "In Active Development",
    stage: "DEVELOPMENT",
    stageLabel: "ENGINEERING IN PROGRESS",
    stageColor: "text-primary border-primary/30 bg-primary/10",
    description:
      "Currently under active implementation, protocol hardening, and automated regression testing:",
    items: [
      "Encrypted local group channels for small clusters and incident squads.",
      "Low-bandwidth compressed voice notes over direct peer-to-peer radio channels.",
      "Automated background reconnection logic when peers temporarily drop out of RF line-of-sight.",
      "Cross-platform research assessing iOS background radio execution and framework boundaries.",
    ],
  },
  {
    title: "Future Possibilities",
    stage: "EXPLORATION",
    stageLabel: "RESEARCH & DESIGN",
    stageColor: "text-on-surface-variant border-outline-variant/30 bg-surface-container-high",
    description:
      "Longer-term architectural investigations planned for future decentralized protocol iterations:",
    items: [
      "Multi-hop mesh relay protocols across intermediate peer hops to extend effective geographical span.",
      "Standardized offline emergency SOS radio beacons receivable by any nearby compatible device.",
      "Developer SDKs and API libraries allowing third-party apps to build on the SPIKER RF physical layer.",
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "Does SPIKER require Internet access or cellular coverage?",
    answer:
      "No. SPIKER operates directly over the built-in Bluetooth and Wi-Fi Direct radios already present in modern smartphones. Your data never traverses telecom gateways, public DNS servers, or cloud servers.",
  },
  {
    id: "faq-2",
    question: "How does SPIKER work completely offline?",
    answer:
      "SPIKER combines two complementary wireless radios: Bluetooth Low Energy emits small, energy-efficient beacon signals that let nearby devices find each other in standby. When a transmission occurs, the devices establish an autonomous, peer-to-peer Wi-Fi Direct socket directly across the air to transfer text, coordinates, or audio payloads at broadband speeds.",
  },
  {
    id: "faq-3",
    question: "Does SPIKER use Bluetooth?",
    answer:
      "Yes. Bluetooth Low Energy (BLE) is used specifically for discovery and proximity sensing. Its minimal power consumption allows the app to detect compatible peers nearby without rapidly draining your phone's battery.",
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
      "Yes. Cellular service is completely irrelevant to SPIKER's operation. You can be in airplane mode with Bluetooth and Wi-Fi turned on, in a remote mountain valley, or in a deep basement, and SPIKER will communicate directly with nearby peers.",
  },
  {
    id: "faq-6",
    question: "Which devices and operating systems are supported?",
    answer:
      "Initial development builds target Android smartphones running modern versions with standard BLE and Wi-Fi Direct hardware support. We are actively researching iOS background execution models to evaluate cross-platform compatibility boundaries.",
  },
  {
    id: "faq-7",
    question: "How far can two devices communicate directly?",
    answer:
      "Real-world communication distance is governed by radio physics. In open outdoor line-of-sight conditions, reliable ranges often reach 50 to 90 meters. Indoors through walls, reinforced concrete, or crowded environments, range will vary according to normal 2.4 GHz and 5 GHz RF attenuation.",
  },
  {
    id: "faq-8",
    question: "Is SPIKER available to download today?",
    answer:
      "SPIKER is currently in private development testing cohorts. You can request early access on this website to be included in upcoming Android testing rounds and receive direct developer build updates.",
  },
  {
    id: "faq-9",
    question: "Can organizations and businesses deploy SPIKER?",
    answer:
      "Yes. We collaborate with industrial operators, search-and-rescue teams, event organizers, and humanitarian field squads who require dependable communication when standard telecom networks fail. Contact our enterprise team to discuss pilot cohort testing.",
  },
];
