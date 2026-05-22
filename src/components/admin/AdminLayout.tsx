import { Link, Outlet } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  Building2,
  ClipboardCheck,
  LayoutDashboard,
  ListTodo,
  Mic2,
  Sparkles,
  Trophy,
  Workflow,
} from "lucide-react";

import { NavLink } from "@/components/NavLink";

const missionMenu = [
  { title: "Overview", url: "/admin", icon: LayoutDashboard },
  { title: "Vendor Leads", url: "/admin/vendor-leads", icon: Building2 },
  { title: "Research Jobs", url: "/admin/research-jobs", icon: Workflow },
  { title: "Company Dossiers", url: "/admin/company-dossiers", icon: ClipboardCheck },
  { title: "Scores", url: "/admin/scores", icon: BarChart3 },
  { title: "Calls / Transcripts", url: "/admin/calls", icon: Mic2 },
  { title: "Follow-ups", url: "/admin/follow-ups", icon: ListTodo },
  { title: "Shortlist", url: "/admin/shortlist", icon: Trophy },
];

export default function MissionControlLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.08),_transparent_30%),linear-gradient(180deg,_rgba(248,250,252,1),_rgba(241,245,249,1))] text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[288px_1fr]">
        <aside className="border-r border-slate-200 bg-slate-950 text-slate-100">
          <div className="sticky top-0 flex h-full flex-col">
            <div className="border-b border-white/10 px-6 py-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-200">
                <Sparkles className="h-3.5 w-3.5" />
                Mission Control
              </div>
              <h1 className="mt-4 text-2xl font-bold tracking-tight">Vendor Sourcing MVP</h1>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Dedicated dashboard for autonomous conversational commerce partner research.
              </p>
            </div>

            <nav className="flex-1 px-4 py-5">
              <div className="mb-4 px-3 text-xs uppercase tracking-[0.18em] text-slate-400">
                Vendor Sourcing
              </div>
              <div className="space-y-1">
                {missionMenu.map((item) => (
                  <NavLink
                    key={item.title}
                    to={item.url}
                    end={item.url === "/admin"}
                    className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                    activeClassName="bg-white/12 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </NavLink>
                ))}
              </div>
            </nav>
          </div>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="flex h-16 items-center gap-3 border-b border-slate-200 bg-white/85 px-6 backdrop-blur">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-primary">AI Operations Dashboard</p>
              <p className="text-lg font-bold tracking-tight">Conversational Commerce Mission Control</p>
            </div>
            <div className="ml-auto">
              <Link
                to="/admin"
                className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to overview
              </Link>
            </div>
          </header>

          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
