import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Bot,
  Building2,
  PhoneCall,
  ShieldAlert,
  Sparkles,
  Target,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { MetricCard, SectionCard, StatusPill } from "@/components/mission-control/MissionControlPrimitives";
import {
  missionControlMetrics,
  researchJobMeta,
  researchJobs,
  shortlistVendors,
  vendorCalls,
  vendorRecords,
  vendorStatusMeta,
} from "@/lib/vendor-sourcing-mock";

const pipelineStages = [
  { key: "discovered", label: "Discovered" },
  { key: "researching", label: "Researching" },
  { key: "analyzed", label: "Analyzed" },
  { key: "ready_to_contact", label: "Ready" },
  { key: "contacted", label: "Contacted" },
  { key: "quoted", label: "Quoted" },
  { key: "shortlisted", label: "Shortlisted" },
  { key: "rejected", label: "Rejected" },
].map((stage) => ({
  ...stage,
  count: vendorRecords.filter((vendor) => vendor.status === stage.key).length,
}));

export default function AdminOverview() {
  const activeBlockers = researchJobs.filter((job) => job.blocker);
  const recentCalls = vendorCalls.slice(0, 3);
  const topShortlist = shortlistVendors.slice(0, 3);

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-primary/10 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(37,99,235,0.22),_transparent_36%),linear-gradient(135deg,_rgba(15,23,42,0.98),_rgba(30,41,59,0.96))] text-white shadow-xl">
        <div className="grid gap-6 px-6 py-7 lg:grid-cols-[1.35fr_0.85fr] lg:px-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-200">
              <Sparkles className="h-3.5 w-3.5" />
              Mission Control
            </div>
            <div className="space-y-3">
              <h1 className="max-w-4xl text-3xl font-bold tracking-tight">Vendor Sourcing mission control for autonomous cross-border partner research</h1>
              <p className="max-w-2xl text-sm leading-6 text-slate-300">
                This MVP visualizes the full sourcing loop before external APIs are wired in: discovery, research,
                scoring, calls, follow-ups, and shortlist management for US-Mexico commerce partners.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-slate-200">
              {["Discovery", "Research", "Scoring", "Calls", "Follow-ups", "Shortlist"].map((label) => (
                <span key={label} className="rounded-full border border-white/15 bg-white/10 px-3 py-1">
                  {label}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-white text-slate-950 hover:bg-slate-100">
                <Link to="/admin/vendor-leads">Open vendor leads</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10">
                <Link to="/admin/shortlist">Review shortlist</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-3">
            {[
              {
                icon: Bot,
                title: "Autonomous engine",
                body: "The workflow is designed so agents do the work first and human operators only handle exceptions.",
              },
              {
                icon: Target,
                title: "Current objective",
                body: "Validate the complete Vendor Sourcing control flow visually before connecting Firecrawl, Trillet, Apollo, or browser fallback.",
              },
              {
                icon: ShieldAlert,
                title: "What needs human review",
                body: `${activeBlockers.length} blocker${activeBlockers.length === 1 ? "" : "s"} currently need operator attention.`,
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-black/15 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/10 p-2">
                    <item.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-300">{item.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total vendor leads"
          value={String(missionControlMetrics.totalLeads)}
          hint="Mock pipeline coverage across Texas, California, and Arizona border regions."
          icon={Building2}
        />
        <MetricCard
          title="Active research jobs"
          value={String(missionControlMetrics.activeResearchJobs)}
          hint="Jobs still crawling, analyzing, or waiting on browser fallback."
          icon={Activity}
        />
        <MetricCard
          title="Ready for contact"
          value={String(missionControlMetrics.readyToContact)}
          hint="Dossiers strong enough to start Apollo enrichment and outreach."
          icon={PhoneCall}
        />
        <MetricCard
          title="Shortlisted vendors"
          value={String(missionControlMetrics.shortlistCount)}
          hint="The highest-confidence candidates for AI-native cross-border ops."
          icon={Target}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <SectionCard
          title="Pipeline state"
          subtitle="Each vendor moves through one shared lifecycle before human review is needed."
        >
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {pipelineStages.map((stage) => (
              <div key={stage.key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{stage.label}</p>
                <p className="mt-2 text-3xl font-bold tracking-tight">{stage.count}</p>
                <div className="mt-3">
                  <StatusPill label={vendorStatusMeta[stage.key as keyof typeof vendorStatusMeta].label} tone={vendorStatusMeta[stage.key as keyof typeof vendorStatusMeta].tone} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Research blockers"
          subtitle="The dashboard exists to surface exceptions, not replace the autonomous pipeline."
        >
          <div className="space-y-3">
            {activeBlockers.map((job) => (
              <div key={job.id} className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-rose-900">{job.companyName}</p>
                    <p className="mt-1 text-sm text-rose-700">{job.blocker}</p>
                  </div>
                  <StatusPill label={researchJobMeta[job.status].label} tone={researchJobMeta[job.status].tone} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionCard
          title="Top shortlist"
          subtitle="These are the candidates the agent would hand to Apollo and outreach next."
        >
          <div className="space-y-3">
            {topShortlist.map((vendor, index) => (
              <div key={vendor.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Rank 0{index + 1}</p>
                    <p className="mt-1 text-lg font-semibold">{vendor.companyName}</p>
                    <p className="text-sm text-muted-foreground">{vendor.location} | {vendor.partnerType}</p>
                  </div>
                  <StatusPill label={`${vendor.overallFitScore.toFixed(1)} fit`} tone="border-primary/20 bg-primary/10 text-primary" />
                </div>
                <p className="mt-3 text-sm text-slate-600">{vendor.fitSummary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {vendor.services.slice(0, 4).map((service) => (
                    <span key={service} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700">
                      {service}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <Button asChild variant="outline" className="rounded-full">
                    <Link to={`/admin/vendor/${vendor.id}`}>
                      Open vendor detail
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Recent calls and transcripts"
          subtitle="Calls should enrich the dossier, not live in isolation."
        >
          <div className="space-y-3">
            {recentCalls.map((call) => (
              <div key={call.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{call.companyName}</p>
                    <p className="text-sm text-muted-foreground">{call.contactName} | {call.occurredLabel}</p>
                  </div>
                  <StatusPill
                    label={call.status === "completed" ? "Completed" : "Needs follow-up"}
                    tone={call.status === "completed" ? "border-emerald-300 bg-emerald-100 text-emerald-700" : "border-amber-300 bg-amber-100 text-amber-800"}
                  />
                </div>
                <p className="mt-3 text-sm text-slate-700">{call.summary}</p>
                <p className="mt-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">{call.transcriptSnippet}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>
    </div>
  );
}
