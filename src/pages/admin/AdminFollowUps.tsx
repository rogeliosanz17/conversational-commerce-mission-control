import { Link } from "react-router-dom";
import { ArrowRight, CheckSquare } from "lucide-react";

import { StatusPill } from "@/components/mission-control/MissionControlPrimitives";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { followUpMeta, vendorFollowUps } from "@/lib/vendor-sourcing-mock";

export default function AdminFollowUps() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm uppercase tracking-[0.24em] text-primary">Vendor sourcing</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Follow-up Tasks</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          This queue is where the autonomous system hands work back to itself or to an operator after research and calls complete.
        </p>
      </section>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Task</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Due</TableHead>
              <TableHead>Context</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendorFollowUps.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="min-w-[240px]">
                  <div className="flex items-start gap-3">
                    <div className="rounded-xl border border-primary/10 bg-primary/5 p-2">
                      <CheckSquare className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.companyName}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{task.companyName}</TableCell>
                <TableCell>
                  <StatusPill label={followUpMeta[task.status].label} tone={followUpMeta[task.status].tone} />
                </TableCell>
                <TableCell>{task.owner}</TableCell>
                <TableCell>{task.dueLabel}</TableCell>
                <TableCell className="min-w-[220px]">
                  <Button asChild variant="link" className="h-auto p-0">
                    <Link to={`/admin/vendor/${task.vendorId}`}>
                      Open vendor detail
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
