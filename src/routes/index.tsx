import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowRight, CalendarDays, Download, Plus } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { StatusBadge } from "@/components/app/status-badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  currency,
  inventory,
  invoices,
  kpis,
  recentActivity,
  revenueSeries,
  revenueSplit,
  topClients,
} from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Axis Business Hub" },
      {
        name: "description",
        content: "Revenue, invoices, cash position and team activity for your business in one workspace.",
      },
      { property: "og:title", content: "Dashboard — Axis Business Hub" },
      {
        property: "og:description",
        content: "Revenue, invoices, cash position and team activity for your business in one workspace.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <AppShell>
      <PageHeader
        title="Hello, Emma 👋"
        description="Here are the latest insights across your organisation."
        actions={
          <>
            <Button variant="outline">
              <CalendarDays className="size-4" />
              This month
            </Button>
            <Button variant="outline">
              <Download className="size-4" />
              Export
            </Button>
            <Button asChild>
              <Link to="/invoices">
                <Plus className="size-4" />
                New invoice
              </Link>
            </Button>
          </>
        }
      />

      <div className="space-y-4 p-4 md:p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <StatCard key={kpi.label} {...kpi} />
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <section className="panel p-5 lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Revenue vs expenses</h2>
                <p className="text-xs text-muted-foreground">Last 8 months, USD</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-chart-1" /> Revenue
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-chart-2" /> Expenses
                </span>
              </div>
            </div>
            <div className="mt-5 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueSeries} margin={{ left: -18, right: 6, top: 4 }}>
                  <defs>
                    <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--color-muted-foreground)" />
                  <YAxis
                    tickFormatter={(v) => `$${v / 1000}k`}
                    tickLine={false}
                    axisLine={false}
                    fontSize={12}
                    stroke="var(--color-muted-foreground)"
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--color-border)",
                      background: "var(--color-popover)",
                      fontSize: 12,
                    }}
                    formatter={(v: number) => currency(v)}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#rev)" />
                  <Area type="monotone" dataKey="expenses" stroke="var(--color-chart-2)" strokeWidth={2} fill="url(#exp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="panel p-5">
            <h2 className="text-sm font-semibold text-foreground">Revenue mix</h2>
            <p className="text-xs text-muted-foreground">Share of total revenue</p>
            <div className="mt-2 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={revenueSplit} dataKey="value" innerRadius={48} outerRadius={72} paddingAngle={3}>
                    {revenueSplit.map((slice) => (
                      <Cell key={slice.name} fill={slice.color} stroke="var(--color-surface)" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid var(--color-border)",
                      background: "var(--color-popover)",
                      fontSize: 12,
                    }}
                    formatter={(v: number) => `${v}%`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-3 space-y-2">
              {revenueSplit.map((slice) => (
                <li key={slice.name} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span className="size-2 rounded-full" style={{ background: slice.color }} />
                    {slice.name}
                  </span>
                  <span className="numeric font-medium">{slice.value}%</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <section className="panel p-5">
            <h2 className="text-sm font-semibold text-foreground">Top clients</h2>
            <p className="text-xs text-muted-foreground">By revenue this year</p>
            <ul className="mt-4 space-y-4">
              {topClients.map((client) => (
                <li key={client.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{client.name}</span>
                    <span className="numeric text-muted-foreground">{currency(client.revenue)}</span>
                  </div>
                  <Progress value={client.share} className="mt-2 h-1.5" />
                </li>
              ))}
            </ul>
          </section>

          <section className="panel p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Stock overview</h2>
                <p className="text-xs text-muted-foreground">Available vs reserved</p>
              </div>
            </div>
            <ul className="mt-4 space-y-4">
              {inventory.map((item) => (
                <li key={item.sku}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{item.name}</span>
                    <StatusBadge status={item.status} />
                  </div>
                  <div className="mt-2 h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "Available", value: item.available },
                          { name: "Reserved", value: item.reserved },
                        ]}
                        layout="vertical"
                        margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      >
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="name" width={62} tickLine={false} axisLine={false} fontSize={11} stroke="var(--color-muted-foreground)" />
                        <Bar dataKey="value" radius={4} fill="var(--color-chart-2)" barSize={10} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel p-5">
            <h2 className="text-sm font-semibold text-foreground">Recent activity</h2>
            <p className="text-xs text-muted-foreground">Across your workspace</p>
            <ul className="mt-4 space-y-4">
              {recentActivity.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-muted text-[0.65rem] text-muted-foreground">
                      {item.actor
                        .split(" ")
                        .map((p) => p[0])
                        .join("")
                        .slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{item.actor}</span> {item.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="panel overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">Latest invoices</h2>
              <p className="text-xs text-muted-foreground">Updated a few minutes ago</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/invoices">
                View all
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 text-left font-medium">Invoice</th>
                  <th className="px-5 py-3 text-left font-medium">Client</th>
                  <th className="px-5 py-3 text-left font-medium">Due</th>
                  <th className="px-5 py-3 text-right font-medium">Amount</th>
                  <th className="px-5 py-3 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {invoices.slice(0, 5).map((inv) => (
                  <tr key={inv.id} className="transition-colors hover:bg-muted/40">
                    <td className="px-5 py-3 font-medium text-primary">{inv.id}</td>
                    <td className="px-5 py-3">{inv.client}</td>
                    <td className="px-5 py-3 text-muted-foreground">{inv.due}</td>
                    <td className="numeric px-5 py-3 text-right font-medium">{currency(inv.amount)}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={inv.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
