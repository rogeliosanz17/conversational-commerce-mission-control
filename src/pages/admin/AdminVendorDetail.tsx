import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  Building2,
  Cable,
  Mic2,
  PhoneCall,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import { MetricCard, SectionCard, StatusPill } from "@/components/mission-control/MissionControlPrimitives";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getVendorById, followUpMeta, researchJobMeta, vendorStatusMeta } from "@/lib/vendor-sourcing-mock";

export default function AdminVendorDetail() {
  const { vendorId } = useParams();
  const vendor = vendorId ? getVendorById(vendorId) : undefined;

  if (!vendor) return <Navigate to="/admin/vendor-leads" replace />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/admin/vendor-leads">
            <ArrowLeft className="h-4 w-4" />
            Back to leads
          </Link>
        </Button>
        <a
          href={vendor.website}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          Visit website
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <section className="overflow-hidden rounded-3xl border border-primary/10 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_36%),linear-gradient(135deg,_rgba(15,23,42,0.98),_rgba(30,41,59,0.95))] text-white shadow-xl">
        <div className="grid gap-6 px-6 py-7 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <StatusPill label={vendorStatusMeta[vendor.status].label} tone={vendorStatusMeta[vendor.status].tone} className="bg-white/10 text-white border-white/20" />
              <StatusPill label={vendor.region} tone="border-white/20 bg-white/10 text-white" />
              <StatusPill label={vendor.partnerType} tone="border-white/20 bg-white/10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{vendor.companyName}</h1>
              <p className="mt-2 text-sm text-slate-300">{vendor.location}</p>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-300">{vendor.fitSummary}</p>
            <div className="flex flex-wrap gap-2">
              {vendor.services.map((service) => (
                <span key={service} className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-slate-200">
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/10 p-5">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-300">Next action</p>
            <p className="mt-3 text-lg font-semibold text-white">{vendor.nextAction}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Pricing model</p>
                <p className="mt-2 text-sm text-white">{vendor.pricingModel}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Quote signal</p>
                <p className="mt-2 text-sm text-white">{vendor.quoteRange ?? "Not captured yet"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Automation" value={vendor.automationScore.toFixed(1)} hint="Workflow and systems readiness." icon={Bot} />
        <MetricCard title="Ecommerce" value={vendor.ecommerceScore.toFixed(1)} hint="Parcel and order-flow compatibility." icon={Target} />
        <MetricCard title="API readiness" value={vendor.apiReadinessScore.toFixed(1)} hint="Signals that this vendor can support automation." icon={Cable} />
        <MetricCard title="Startup fit" value={vendor.startupFriendlinessScore.toFixed(1)} hint="How friendly the offer looks for a fast-moving operator." icon={Sparkles} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard title="Research pipeline" subtitle={vendor.research.stageLabel}>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <StatusPill label={researchJobMeta[vendor.research.status].label} tone={researchJobMeta[vendor.research.status].tone} />
              {vendor.research.fallbackUsed ? <StatusPill label="Browser fallback touched" tone="border-amber-300 bg-amber-100 text-amber-800" /> : null}
            </div>
            <Progress value={vendor.research.progress} className="h-3 bg-slate-200" />
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Pages visited</p>
                <p className="mt-2 text-2xl font-bold">{vendor.research.pagesVisited}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Pages planned</p>
                <p className="mt-2 text-2xl font-bold">{vendor.research.pagesPlanned}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Confidence</p>
                <p className="mt-2 text-2xl font-bold">{vendor.research.confidence}%</p>
              </div>
            </div>
            {vendor.research.blocker ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                {vendor.research.blocker}
              </div>
            ) : null}
          </div>
        </SectionCard>

        <SectionCard title="Decision-makers" subtitle="Apollo or manual enrichment would land here later.">
          <div className="space-y-3">
            {vendor.contacts.length > 0 ? vendor.contacts.map((contact) => (
              <div key={contact.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.title}</p>
                    <p className="mt-2 text-sm text-slate-700">{contact.email}</p>
                  </div>
                  <StatusPill
                    label={`${contact.priority} priority`}
                    tone={
                      contact.priority === "high"
                        ? "border-emerald-300 bg-emerald-100 text-emerald-700"
                        : contact.priority === "medium"
                          ? "border-amber-300 bg-amber-100 text-amber-800"
                          : "border-slate-300 bg-slate-100 text-slate-700"
                    }
                  />
                </div>
              </div>
            )) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-muted-foreground">
                No contacts enriched yet. This vendor would move to Apollo once the threshold gate passes.
              </div>
            )}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <SectionCard title="Strengths" subtitle="What the agent likes">
          <div className="space-y-2 text-sm text-slate-700">
            {vendor.strengths.map((strength) => (
              <p key={strength}>{strength}</p>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Weaknesses" subtitle="What still needs proof">
          <div className="space-y-2 text-sm text-slate-700">
            {vendor.weaknesses.map((weakness) => (
              <p key={weakness}>{weakness}</p>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Risk flags" subtitle="What can block rollout">
          <div className="space-y-2 text-sm text-slate-700">
            {vendor.riskFlags.length > 0 ? vendor.riskFlags.map((flag) => (
              <p key={flag}>{flag}</p>
            )) : <p>No critical flags captured yet.</p>}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Calls and transcripts" subtitle="Research should get richer after every conversation.">
          <div className="space-y-4">
            {vendor.calls.length > 0 ? vendor.calls.map((call) => (
              <div key={call.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-semibold">{call.contactName}</p>
                      <p className="text-sm text-muted-foreground">{call.occurredLabel}</p>
                    </div>
                  </div>
                  <StatusPill
                    label={call.status === "completed" ? "Completed" : call.status === "scheduled" ? "Scheduled" : "Needs follow-up"}
                    tone={
                      call.status === "completed"
                        ? "border-emerald-300 bg-emerald-100 text-emerald-700"
                        : call.status === "scheduled"
                          ? "border-sky-300 bg-sky-100 text-sky-700"
                          : "border-amber-300 bg-amber-100 text-amber-800"
                    }
                  />
                </div>
                <p className="mt-3 text-sm text-slate-700">{call.summary}</p>
                <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2">
                    <Mic2 className="h-4 w-4 text-primary" />
                    <p className="font-medium text-slate-900">Transcript highlight</p>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{call.transcriptSnippet}</p>
                </div>
              </div>
            )) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-muted-foreground">
                No calls logged yet. Voice activity will appear here once Trillet is connected.
              </div>
            )}
          </div>
        </SectionCard>

        <SectionCard title="Follow-up tasks" subtitle="The self-driving queue for what happens after research or a call.">
          <div className="space-y-3">
            {vendor.followUps.length > 0 ? vendor.followUps.map((task) => (
              <div key={task.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.owner} | {task.dueLabel}</p>
                  </div>
                  <StatusPill label={followUpMeta[task.status].label} tone={followUpMeta[task.status].tone} />
                </div>
              </div>
            )) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-muted-foreground">
                No follow-up tasks are queued for this vendor yet.
              </div>
            )}
          </div>
        </SectionCard>
      </section>

      <SectionCard title="Internal notes" subtitle="What the operator should know right now.">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              <p className="font-medium text-slate-900">Profile</p>
            </div>
            <p className="mt-3 text-sm text-slate-700">{vendor.partnerType} focused on {vendor.region.toLowerCase()} coverage.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <p className="font-medium text-slate-900">Owner</p>
            </div>
            <p className="mt-3 text-sm text-slate-700">{vendor.owner} currently owns this relationship and review path.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="font-medium text-slate-900">Agent note</p>
            </div>
            <p className="mt-3 text-sm text-slate-700">{vendor.nextAction}</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
