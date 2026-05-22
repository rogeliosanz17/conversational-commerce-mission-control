import { Link } from "react-router-dom";
import { ArrowRight, BarChart3 } from "lucide-react";

import { StatusPill } from "@/components/mission-control/MissionControlPrimitives";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { vendorRecords } from "@/lib/vendor-sourcing-mock";

const orderedVendors = [...vendorRecords].sort((left, right) => right.overallFitScore - left.overallFitScore);

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
        <span className="font-semibold text-slate-900">{value.toFixed(1)}</span>
      </div>
      <Progress value={value * 10} className="h-2 bg-slate-200" />
    </div>
  );
}

export default function AdminScores() {
  return (
    <div className="space-y-6">
      <section className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-primary">Vendor sourcing</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Scores</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Scorecards translate raw company research into a comparable decision framework for AI-native logistics partners.
          </p>
        </div>
        <StatusPill label="Mock scoring model" tone="border-primary/20 bg-primary/10 text-primary" />
      </section>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor</TableHead>
              <TableHead>Automation</TableHead>
              <TableHead>Ecommerce</TableHead>
              <TableHead>API readiness</TableHead>
              <TableHead>Startup fit</TableHead>
              <TableHead>Overall fit</TableHead>
              <TableHead>Next step</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderedVendors.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell className="min-w-[240px]">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      <p className="font-semibold">{vendor.companyName}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{vendor.location} | {vendor.partnerType}</p>
                  </div>
                </TableCell>
                <TableCell className="min-w-[160px]"><ScoreBar label="Automation" value={vendor.automationScore} /></TableCell>
                <TableCell className="min-w-[160px]"><ScoreBar label="Ecommerce" value={vendor.ecommerceScore} /></TableCell>
                <TableCell className="min-w-[160px]"><ScoreBar label="API" value={vendor.apiReadinessScore} /></TableCell>
                <TableCell className="min-w-[160px]"><ScoreBar label="Startup" value={vendor.startupFriendlinessScore} /></TableCell>
                <TableCell>
                  <StatusPill label={vendor.overallFitScore.toFixed(1)} tone="border-primary/20 bg-primary/10 text-primary" />
                </TableCell>
                <TableCell className="min-w-[220px]">
                  <div className="space-y-2 text-sm text-slate-600">
                    <p>{vendor.nextAction}</p>
                    <Button asChild variant="link" className="h-auto p-0">
                      <Link to={`/admin/vendor/${vendor.id}`}>
                        View detail
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
