import { Link } from "react-router-dom";
import { ArrowRight, Globe, ShieldAlert } from "lucide-react";

import { StatusPill } from "@/components/mission-control/MissionControlPrimitives";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { researchJobMeta, researchJobs } from "@/lib/vendor-sourcing-mock";

export default function AdminResearchJobs() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm uppercase tracking-[0.24em] text-primary">Vendor sourcing</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Research Jobs</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Visual status for every discovery, crawl, scoring, and fallback browser step in the sourcing engine.
        </p>
      </section>

      <div className="grid gap-4">
        {researchJobs.map((job) => (
          <div key={job.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-semibold">{job.companyName}</h2>
                  <StatusPill label={researchJobMeta[job.status].label} tone={researchJobMeta[job.status].tone} />
                  {job.fallbackUsed ? (
                    <StatusPill label="Fallback used" tone="border-amber-300 bg-amber-100 text-amber-800" />
                  ) : null}
                </div>
                <p className="text-sm text-muted-foreground">{job.location}</p>
                <p className="text-sm text-slate-700">{job.stageLabel}</p>
              </div>

              <div className="flex gap-2">
                <Button asChild variant="outline" className="rounded-full">
                  <Link to={`/admin/vendor/${job.vendorId}`}>
                    Open vendor detail
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-900">Pipeline progress</span>
                  <span className="text-muted-foreground">{job.progress}%</span>
                </div>
                <Progress value={job.progress} className="mt-3 h-3 bg-slate-200" />
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Pages visited</p>
                    <p className="mt-1 text-2xl font-bold">{job.pagesVisited}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Planned pages</p>
                    <p className="mt-1 text-2xl font-bold">{job.pagesPlanned}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Confidence</p>
                    <p className="mt-1 text-2xl font-bold">{job.confidence}%</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  {job.blocker ? <ShieldAlert className="h-4 w-4 text-rose-600" /> : <Globe className="h-4 w-4 text-primary" />}
                  <p className="font-medium text-slate-900">Latest run</p>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{job.lastRunLabel}</p>
                <p className="mt-3 text-sm text-slate-700">
                  {job.blocker
                    ? job.blocker
                    : "No blocker detected. This job is ready for the next autonomous stage."}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
