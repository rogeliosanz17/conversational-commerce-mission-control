import { Link } from "react-router-dom";
import { ArrowRight, FileText, ShieldAlert, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionCard, StatusPill } from "@/components/mission-control/MissionControlPrimitives";
import { vendorRecords, vendorStatusMeta } from "@/lib/vendor-sourcing-mock";

export default function AdminCompanyDossiers() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm uppercase tracking-[0.24em] text-primary">Vendor sourcing</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Company Dossiers</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Each dossier consolidates website evidence, scoring rationale, contacts, and the next recommended move.
        </p>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        {vendorRecords.map((vendor) => (
          <SectionCard
            key={vendor.id}
            title={vendor.companyName}
            subtitle={`${vendor.location} | ${vendor.partnerType}`}
          >
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <StatusPill label={vendorStatusMeta[vendor.status].label} tone={vendorStatusMeta[vendor.status].tone} />
                <StatusPill label={`${vendor.research.confidence}% confidence`} tone="border-slate-300 bg-slate-100 text-slate-700" />
                <StatusPill label={`${vendor.overallFitScore.toFixed(1)} fit`} tone="border-primary/20 bg-primary/10 text-primary" />
              </div>

              <p className="text-sm text-slate-700">{vendor.fitSummary}</p>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-emerald-600" />
                    <p className="font-medium text-slate-900">Strengths</p>
                  </div>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    {vendor.strengths.map((strength) => (
                      <p key={strength}>{strength}</p>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-rose-600" />
                    <p className="font-medium text-slate-900">Risk flags</p>
                  </div>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    {(vendor.riskFlags.length > 0 ? vendor.riskFlags : ["No critical flags captured yet"]).map((flag) => (
                      <p key={flag}>{flag}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <p className="font-medium text-slate-900">Operator summary</p>
                </div>
                <p className="mt-3 text-sm text-slate-700">{vendor.nextAction}</p>
              </div>

              <div className="flex justify-end">
                <Button asChild variant="outline" className="rounded-full">
                  <Link to={`/admin/vendor/${vendor.id}`}>
                    Open full dossier
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
