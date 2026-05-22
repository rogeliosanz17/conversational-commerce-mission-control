import { Link } from "react-router-dom";
import { ArrowRight, Mic2, PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionCard, StatusPill } from "@/components/mission-control/MissionControlPrimitives";
import { vendorCalls } from "@/lib/vendor-sourcing-mock";

export default function AdminCalls() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm uppercase tracking-[0.24em] text-primary">Vendor sourcing</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Calls and Transcripts</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Voice activity should feed the sourcing engine with pricing, process, and integration details that were missing on the website.
        </p>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        {vendorCalls.map((call) => (
          <SectionCard
            key={call.id}
            title={call.companyName}
            subtitle={`${call.contactName} | ${call.occurredLabel}`}
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
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
                <StatusPill label={call.region} tone="border-slate-300 bg-slate-100 text-slate-700" />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-primary" />
                  <p className="font-medium text-slate-900">Call summary</p>
                </div>
                <p className="mt-3 text-sm text-slate-700">{call.summary}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <Mic2 className="h-4 w-4 text-primary" />
                  <p className="font-medium text-slate-900">Transcript highlight</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">{call.transcriptSnippet}</p>
              </div>

              <div className="flex justify-end">
                <Button asChild variant="outline" className="rounded-full">
                  <Link to={`/admin/vendor/${call.vendorId}`}>
                    Open vendor detail
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
