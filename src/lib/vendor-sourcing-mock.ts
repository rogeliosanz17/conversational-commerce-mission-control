export type VendorStatus =
  | "discovered"
  | "researching"
  | "analyzed"
  | "ready_to_contact"
  | "contacted"
  | "quoted"
  | "shortlisted"
  | "rejected";

export type ResearchJobStatus =
  | "queued"
  | "crawling"
  | "analyzing"
  | "fallback"
  | "completed"
  | "blocked";

export type FollowUpStatus = "open" | "scheduled" | "waiting" | "done";

export interface VendorFollowUpTask {
  id: string;
  title: string;
  dueLabel: string;
  status: FollowUpStatus;
  owner: string;
}

export interface VendorContact {
  id: string;
  name: string;
  title: string;
  email: string;
  priority: "high" | "medium" | "low";
}

export interface VendorCall {
  id: string;
  contactName: string;
  status: "scheduled" | "completed" | "needs_follow_up";
  occurredLabel: string;
  summary: string;
  transcriptSnippet: string;
}

export interface VendorResearch {
  jobId: string;
  status: ResearchJobStatus;
  stageLabel: string;
  progress: number;
  pagesVisited: number;
  pagesPlanned: number;
  fallbackUsed: boolean;
  confidence: number;
  blocker?: string;
  lastRunLabel: string;
}

export interface VendorRecord {
  id: string;
  companyName: string;
  location: string;
  region: string;
  website: string;
  partnerType: string;
  status: VendorStatus;
  services: string[];
  leadSource: string;
  owner: string;
  fitSummary: string;
  nextAction: string;
  automationScore: number;
  ecommerceScore: number;
  apiReadinessScore: number;
  startupFriendlinessScore: number;
  overallFitScore: number;
  pricingModel: string;
  quoteRange?: string;
  strengths: string[];
  weaknesses: string[];
  riskFlags: string[];
  contacts: VendorContact[];
  calls: VendorCall[];
  followUps: VendorFollowUpTask[];
  research: VendorResearch;
}

export const vendorStatusMeta: Record<VendorStatus, { label: string; tone: string }> = {
  discovered: { label: "Discovered", tone: "border-slate-300 bg-slate-100 text-slate-700" },
  researching: { label: "Researching", tone: "border-sky-300 bg-sky-100 text-sky-700" },
  analyzed: { label: "Analyzed", tone: "border-violet-300 bg-violet-100 text-violet-700" },
  ready_to_contact: { label: "Ready to contact", tone: "border-emerald-300 bg-emerald-100 text-emerald-700" },
  contacted: { label: "Contacted", tone: "border-amber-300 bg-amber-100 text-amber-800" },
  quoted: { label: "Quoted", tone: "border-indigo-300 bg-indigo-100 text-indigo-700" },
  shortlisted: { label: "Shortlisted", tone: "border-primary/20 bg-primary/10 text-primary" },
  rejected: { label: "Rejected", tone: "border-rose-300 bg-rose-100 text-rose-700" },
};

export const researchJobMeta: Record<ResearchJobStatus, { label: string; tone: string }> = {
  queued: { label: "Queued", tone: "border-slate-300 bg-slate-100 text-slate-700" },
  crawling: { label: "Crawling", tone: "border-sky-300 bg-sky-100 text-sky-700" },
  analyzing: { label: "Analyzing", tone: "border-violet-300 bg-violet-100 text-violet-700" },
  fallback: { label: "Fallback browser", tone: "border-amber-300 bg-amber-100 text-amber-800" },
  completed: { label: "Completed", tone: "border-emerald-300 bg-emerald-100 text-emerald-700" },
  blocked: { label: "Blocked", tone: "border-rose-300 bg-rose-100 text-rose-700" },
};

export const followUpMeta: Record<FollowUpStatus, { label: string; tone: string }> = {
  open: { label: "Open", tone: "border-amber-300 bg-amber-100 text-amber-800" },
  scheduled: { label: "Scheduled", tone: "border-sky-300 bg-sky-100 text-sky-700" },
  waiting: { label: "Waiting", tone: "border-violet-300 bg-violet-100 text-violet-700" },
  done: { label: "Done", tone: "border-emerald-300 bg-emerald-100 text-emerald-700" },
};

export const vendorRecords: VendorRecord[] = [
  {
    id: "rio-fulfillment",
    companyName: "Rio Fulfillment Partners",
    location: "Laredo, TX",
    region: "Texas border",
    website: "https://riofulfillment.example",
    partnerType: "Cross-border ecommerce fulfillment",
    status: "shortlisted",
    services: ["Small parcel", "Returns", "Mexico linehaul", "Shopify integration"],
    leadSource: "Firecrawl search",
    owner: "Maya",
    fitSummary: "Best overall mix of parcel ops, Mexico support, and startup onboarding speed.",
    nextAction: "Schedule pricing validation call with operations lead.",
    automationScore: 8.8,
    ecommerceScore: 9.1,
    apiReadinessScore: 8.4,
    startupFriendlinessScore: 8.6,
    overallFitScore: 8.8,
    pricingModel: "Quote-based with published storage assumptions",
    quoteRange: "$2.70-$3.30 per parcel before customs",
    strengths: [
      "Parcel-first operation with visible ecommerce terminology.",
      "Shows OMS and carrier integrations across multiple pages.",
      "Border handoff model is clear enough for conversational order routing.",
    ],
    weaknesses: [
      "No public developer docs yet.",
      "Customs surcharges still need confirmation by call.",
    ],
    riskFlags: ["Pricing still requires live confirmation"],
    contacts: [
      { id: "c1", name: "Elena Ruiz", title: "Director of Fulfillment", email: "elena@riofulfillment.example", priority: "high" },
      { id: "c2", name: "Marco Solis", title: "Solutions Engineer", email: "marco@riofulfillment.example", priority: "medium" },
    ],
    calls: [
      {
        id: "call-1",
        contactName: "Elena Ruiz",
        status: "completed",
        occurredLabel: "Today, 11:20 AM",
        summary: "Confirmed same-day pick-pack cutoff and startup onboarding in under 3 weeks.",
        transcriptSnippet: "We can support Mexico-bound small parcel orders daily, but the customs filing method depends on SKU mix and declared value.",
      },
    ],
    followUps: [
      { id: "f1", title: "Request customs fee sheet", dueLabel: "Today", status: "open", owner: "Maya" },
      { id: "f2", title: "Verify webhook event coverage", dueLabel: "Tomorrow", status: "scheduled", owner: "Codex" },
    ],
    research: {
      jobId: "job-rio",
      status: "completed",
      stageLabel: "Completed with high confidence",
      progress: 100,
      pagesVisited: 8,
      pagesPlanned: 8,
      fallbackUsed: false,
      confidence: 92,
      lastRunLabel: "14 minutes ago",
    },
  },
  {
    id: "otay-commerce",
    companyName: "Otay Commerce Hub",
    location: "Otay Mesa, CA",
    region: "California border",
    website: "https://otaycommercehub.example",
    partnerType: "3PL + customs brokerage",
    status: "ready_to_contact",
    services: ["Warehousing", "Customs brokerage", "Marketplace prep", "Tracking portal"],
    leadSource: "Browserbase fallback",
    owner: "Ops Agent 02",
    fitSummary: "Strong border location and customs depth, but ecommerce motion looks more mid-market than startup-native.",
    nextAction: "Enrich contacts in Apollo and launch first email sequence.",
    automationScore: 7.4,
    ecommerceScore: 7.1,
    apiReadinessScore: 6.6,
    startupFriendlinessScore: 5.9,
    overallFitScore: 6.9,
    pricingModel: "Quote-only",
    strengths: [
      "Customs and bonded warehouse positioning is explicit.",
      "Portal and shipment visibility are marketed clearly.",
      "Strong fit for California border coverage.",
    ],
    weaknesses: [
      "No obvious startup onboarding language.",
      "Parcel economics are not transparent on-site.",
    ],
    riskFlags: ["Unknown startup minimums", "API depth still unverified"],
    contacts: [
      { id: "c3", name: "Derek Hall", title: "Business Development Manager", email: "derek@otaycommercehub.example", priority: "high" },
    ],
    calls: [],
    followUps: [
      { id: "f3", title: "Generate outbound email draft", dueLabel: "Today", status: "open", owner: "Codex" },
      { id: "f4", title: "Find technical integration contact", dueLabel: "Tomorrow", status: "waiting", owner: "Apollo Agent" },
    ],
    research: {
      jobId: "job-otay",
      status: "completed",
      stageLabel: "Completed after fallback browser run",
      progress: 100,
      pagesVisited: 7,
      pagesPlanned: 8,
      fallbackUsed: true,
      confidence: 81,
      lastRunLabel: "38 minutes ago",
    },
  },
  {
    id: "frontera-parcel",
    companyName: "Frontera Parcel Network",
    location: "McAllen, TX",
    region: "Texas border",
    website: "https://fronteraparcel.example",
    partnerType: "Parcel forwarding network",
    status: "contacted",
    services: ["Parcel forwarding", "Mexico consolidation", "SMS notifications"],
    leadSource: "Firecrawl search",
    owner: "Maya",
    fitSummary: "Good parcel bias and consumer delivery language, but limited technology evidence so far.",
    nextAction: "Wait for pricing reply and test whether tracking events are machine-readable.",
    automationScore: 6.3,
    ecommerceScore: 7.8,
    apiReadinessScore: 4.8,
    startupFriendlinessScore: 7.4,
    overallFitScore: 6.6,
    pricingModel: "Flat fee shown for base routing",
    quoteRange: "$18 monthly storage minimum + route fees",
    strengths: [
      "Clear parcel and Mexico delivery fit.",
      "Consumer-facing operations copy suggests order volume flexibility.",
    ],
    weaknesses: [
      "No public API or webhook evidence.",
      "Research still missing deeper ops documentation.",
    ],
    riskFlags: ["Low integration confidence"],
    contacts: [
      { id: "c4", name: "Ana Cantu", title: "Partnerships Manager", email: "ana@fronteraparcel.example", priority: "high" },
    ],
    calls: [
      {
        id: "call-2",
        contactName: "Ana Cantu",
        status: "needs_follow_up",
        occurredLabel: "Yesterday",
        summary: "Positive first call, but pricing attachment and portal demo are still pending.",
        transcriptSnippet: "If your order volume ramps, we can assign a shared account rep, but API access would need product review from our tech team.",
      },
    ],
    followUps: [
      { id: "f5", title: "Send portal demo request", dueLabel: "Today", status: "open", owner: "Maya" },
      { id: "f6", title: "Log pricing PDF when received", dueLabel: "Waiting on reply", status: "waiting", owner: "Codex" },
    ],
    research: {
      jobId: "job-frontera",
      status: "completed",
      stageLabel: "Completed with medium confidence",
      progress: 100,
      pagesVisited: 6,
      pagesPlanned: 7,
      fallbackUsed: false,
      confidence: 74,
      lastRunLabel: "2 hours ago",
    },
  },
  {
    id: "desert-customs",
    companyName: "Desert Customs Lane",
    location: "Nogales, AZ",
    region: "Arizona border",
    website: "https://desertcustomslane.example",
    partnerType: "Customs broker",
    status: "analyzed",
    services: ["Customs filing", "Compliance advisory", "Cross-dock coordination"],
    leadSource: "Firecrawl search",
    owner: "Ops Agent 03",
    fitSummary: "High customs strength, but no signal yet that this is an ecommerce-friendly parcel operator.",
    nextAction: "Keep in secondary pool unless paired with a stronger parcel partner.",
    automationScore: 4.9,
    ecommerceScore: 4.6,
    apiReadinessScore: 3.7,
    startupFriendlinessScore: 4.2,
    overallFitScore: 4.4,
    pricingModel: "Opaque",
    strengths: [
      "Customs specialization is explicit.",
      "Strong regional relevance for Arizona border.",
    ],
    weaknesses: [
      "Little to no parcel or ecommerce motion.",
      "No visible integration tooling.",
    ],
    riskFlags: ["Likely manual workflow", "Not a standalone fit for conversational commerce"],
    contacts: [],
    calls: [],
    followUps: [
      { id: "f7", title: "Tag as specialist partner only", dueLabel: "Today", status: "done", owner: "Codex" },
    ],
    research: {
      jobId: "job-desert",
      status: "completed",
      stageLabel: "Completed and deprioritized",
      progress: 100,
      pagesVisited: 5,
      pagesPlanned: 6,
      fallbackUsed: false,
      confidence: 78,
      lastRunLabel: "4 hours ago",
    },
  },
  {
    id: "borderbridge-3pl",
    companyName: "BorderBridge 3PL",
    location: "El Paso, TX",
    region: "Texas border",
    website: "https://borderbridge3pl.example",
    partnerType: "3PL",
    status: "researching",
    services: ["Warehousing", "Kitting", "Returns"],
    leadSource: "Firecrawl search",
    owner: "Research Agent",
    fitSummary: "Potential fit, but current crawl is still incomplete because contact and integrations pages require JS rendering.",
    nextAction: "Run Browserbase fallback and update dossier confidence.",
    automationScore: 6.0,
    ecommerceScore: 6.7,
    apiReadinessScore: 5.1,
    startupFriendlinessScore: 5.8,
    overallFitScore: 5.9,
    pricingModel: "Unknown",
    strengths: [
      "Mentions returns and omnichannel support.",
    ],
    weaknesses: [
      "Research still incomplete.",
    ],
    riskFlags: ["Pending fallback crawl"],
    contacts: [],
    calls: [],
    followUps: [
      { id: "f8", title: "Retry integrations page with browser session", dueLabel: "In 30 min", status: "scheduled", owner: "Research Agent" },
    ],
    research: {
      jobId: "job-borderbridge",
      status: "fallback",
      stageLabel: "Waiting on browser fallback",
      progress: 62,
      pagesVisited: 5,
      pagesPlanned: 8,
      fallbackUsed: true,
      confidence: 59,
      blocker: "Pricing and integrations pages render blank in static crawl.",
      lastRunLabel: "6 minutes ago",
    },
  },
  {
    id: "lone-star-freight",
    companyName: "Lone Star Freight Gateway",
    location: "Brownsville, TX",
    region: "Texas border",
    website: "https://lonestarfreight.example",
    partnerType: "Freight forwarder",
    status: "rejected",
    services: ["Pallet freight", "LTL", "Brokerage"],
    leadSource: "Manual import",
    owner: "Maya",
    fitSummary: "Freight-heavy operator with weak ecommerce and parcel signals.",
    nextAction: "Exclude from active sourcing pool.",
    automationScore: 3.8,
    ecommerceScore: 3.5,
    apiReadinessScore: 2.4,
    startupFriendlinessScore: 3.9,
    overallFitScore: 3.5,
    pricingModel: "Quote-only",
    strengths: [
      "Regional border presence exists.",
    ],
    weaknesses: [
      "Almost no ecommerce signal.",
      "Freight-first operating model does not match target workflow.",
    ],
    riskFlags: ["Pallet-first", "Manual operations likely", "Low strategic fit"],
    contacts: [],
    calls: [],
    followUps: [],
    research: {
      jobId: "job-lonestar",
      status: "completed",
      stageLabel: "Rejected after scoring review",
      progress: 100,
      pagesVisited: 4,
      pagesPlanned: 5,
      fallbackUsed: false,
      confidence: 88,
      lastRunLabel: "1 day ago",
    },
  },
];

export const missionControlMetrics = {
  totalLeads: vendorRecords.length,
  activeResearchJobs: vendorRecords.filter((vendor) => ["researching", "discovered"].includes(vendor.status)).length,
  readyToContact: vendorRecords.filter((vendor) => ["ready_to_contact", "contacted", "quoted", "shortlisted"].includes(vendor.status)).length,
  shortlistCount: vendorRecords.filter((vendor) => vendor.status === "shortlisted").length,
};

export const researchJobs = vendorRecords.map((vendor) => ({
  id: vendor.research.jobId,
  vendorId: vendor.id,
  companyName: vendor.companyName,
  location: vendor.location,
  status: vendor.research.status,
  stageLabel: vendor.research.stageLabel,
  progress: vendor.research.progress,
  pagesVisited: vendor.research.pagesVisited,
  pagesPlanned: vendor.research.pagesPlanned,
  fallbackUsed: vendor.research.fallbackUsed,
  confidence: vendor.research.confidence,
  blocker: vendor.research.blocker,
  lastRunLabel: vendor.research.lastRunLabel,
}));

export const vendorCalls = vendorRecords.flatMap((vendor) =>
  vendor.calls.map((call) => ({
    ...call,
    vendorId: vendor.id,
    companyName: vendor.companyName,
    region: vendor.region,
    nextAction: vendor.nextAction,
  })),
);

export const vendorFollowUps = vendorRecords.flatMap((vendor) =>
  vendor.followUps.map((task) => ({
    ...task,
    vendorId: vendor.id,
    companyName: vendor.companyName,
    statusLabel: followUpMeta[task.status].label,
  })),
);

export const shortlistVendors = vendorRecords.filter((vendor) =>
  ["shortlisted", "quoted", "ready_to_contact"].includes(vendor.status),
);

export function getVendorById(vendorId: string) {
  return vendorRecords.find((vendor) => vendor.id === vendorId);
}
