import { Link } from "react-router-dom";
import { ArrowRight, Medal, PhoneCall, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionCard, StatusPill } from "@/components/mission-control/MissionControlPrimitives";
import { shortlistVendors, vendorStatusMeta } from "@/lib/vendor-sourcing-mock";

const ranked = [...shortlistVendors].sort((left, right) => right.overallFitScore - left.overallFitScore);

export default function AdminShortlist() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm uppercase tracking-[0.24em] text-primary">Vendor sourcing</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Shortlist</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Ranked candidates that are closest to supporting AI-powered conversational commerce across the border.
        </p>
      </section>

      <div className="grid gap-4 xl:grid-cols-3">
        {ranked.map((vendor, index) => (
          <SectionCard
            key={vendor.id}
            title={vendor.companyName}
            subtitle={`${vendor.location} | ${vendor.partnerType}`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <StatusPill label={`Rank 0${index + 1}`} tone="border-primary/20 bg-primary/10 text-primary" />
                <StatusPill label={vendorStatusMeta[vendor.status].label} tone={vendorStatusMeta[vendor.status].tone} />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <Medal className="h-4 w-4 text-primary" />
                  <p className="font-medium text-slate-900">Overall fit</p>
                </div>
                <p className="mt-2 text-4xl font-bold tracking-tight">{vendor.overallFitScore.toFixed(1)}</p>
                <p className="mt-2 text-sm text-slate-600">{vendor.fitSummary}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-primary" />
                    <p className="font-medium text-slate-900">Pricing</p>
                  </div>
                  <p className="mt-3 text-sm text-slate-700">{vendor.pricingModel}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{vendor.quoteRange ?? "Quote not captured yet"}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="h-4 w-4 text-primary" />
                    <p className="font-medium text-slate-900">Next action</p>
                  </div>
                  <p className="mt-3 text-sm text-slate-700">{vendor.nextAction}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {vendor.services.slice(0, 4).map((service) => (
                  <span key={service} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700">
                    {service}
                  </span>
                ))}
              </div>

              <div className="flex justify-end">
                <Button asChild variant="outline" className="rounded-full">
                  <Link to={`/admin/vendor/${vendor.id}`}>
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
