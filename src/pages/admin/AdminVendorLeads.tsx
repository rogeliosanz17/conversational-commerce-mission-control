import { useDeferredValue, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search } from "lucide-react";

import { StatusPill } from "@/components/mission-control/MissionControlPrimitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { vendorRecords, vendorStatusMeta } from "@/lib/vendor-sourcing-mock";

export default function AdminVendorLeads() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query).trim().toLowerCase();

  const filtered = vendorRecords.filter((vendor) => {
    if (!deferredQuery) return true;
    return [
      vendor.companyName,
      vendor.location,
      vendor.region,
      vendor.partnerType,
      vendor.services.join(" "),
      vendor.status,
    ]
      .join(" ")
      .toLowerCase()
      .includes(deferredQuery);
  });

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-primary">Vendor sourcing</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Vendor Leads</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            The discovery queue that feeds the autonomous research and scoring pipeline.
          </p>
        </div>

        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search region, company, service, status..."
            className="pl-9"
          />
        </div>
      </section>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Lead source</TableHead>
              <TableHead>Next action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((vendor) => (
              <TableRow key={vendor.id}>
                <TableCell className="min-w-[250px]">
                  <div className="space-y-2">
                    <div>
                      <p className="font-semibold">{vendor.companyName}</p>
                      <p className="text-xs text-muted-foreground">{vendor.location} | {vendor.partnerType}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="link" className="h-auto p-0 text-xs">
                        <Link to={`/admin/vendor/${vendor.id}`}>Open detail</Link>
                      </Button>
                      <a
                        href={vendor.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        Visit site
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusPill label={vendorStatusMeta[vendor.status].label} tone={vendorStatusMeta[vendor.status].tone} />
                </TableCell>
                <TableCell>{vendor.region}</TableCell>
                <TableCell className="min-w-[230px]">
                  <div className="flex flex-wrap gap-2">
                    {vendor.services.slice(0, 3).map((service) => (
                      <span key={service} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700">
                        {service}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{vendor.owner}</TableCell>
                <TableCell>{vendor.leadSource}</TableCell>
                <TableCell className="min-w-[220px] text-sm text-slate-600">{vendor.nextAction}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
