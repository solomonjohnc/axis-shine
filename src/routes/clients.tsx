import { createFileRoute } from "@tanstack/react-router";
import { Download, Filter, MoreHorizontal, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { StatusBadge } from "@/components/app/status-badge";
import { FormDialog, Field, FieldRow } from "@/components/app/form-dialog";
import { ConfirmDialog } from "@/components/app/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { clients, currency } from "@/lib/mock-data";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clients — Axis Business Hub" },
      { name: "description", content: "Manage client records, balances and contacts across every market you serve." },
      { property: "og:title", content: "Clients — Axis Business Hub" },
      { property: "og:description", content: "Manage client records, balances and contacts in Axis Business Hub." },
    ],
  }),
  component: ClientsPage,
});

function ClientFormDialog({ trigger, title }: { trigger: React.ReactNode; title: string }) {
  return (
    <FormDialog trigger={trigger} title={title} description="Client records feed invoicing and receivables." wide onSubmitToast="Client saved">
      <FieldRow>
        <Field label="Company name">
          <Input placeholder="Qatar Furniture" />
        </Field>
        <Field label="Primary contact">
          <Input placeholder="Hamad Al-Thani" />
        </Field>
      </FieldRow>
      <FieldRow>
        <Field label="Email">
          <Input type="email" placeholder="accounts@company.com" />
        </Field>
        <Field label="Phone">
          <Input placeholder="+974 5512 4487" />
        </Field>
      </FieldRow>
      <FieldRow>
        <Field label="Country">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {["Kenya", "UAE", "Qatar", "Bangladesh", "South Korea"].map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Status">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Active" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="prospect">Prospect</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </FieldRow>
      <Field label="Billing address">
        <Textarea rows={3} placeholder="Street, city, postal code" />
      </Field>
      <Field label="Notes" hint="Only visible to your team.">
        <Textarea rows={2} placeholder="Payment terms, key relationships…" />
      </Field>
    </FormDialog>
  );
}

function ClientsPage() {
  const receivable = clients.reduce((sum, c) => sum + c.balance, 0);

  return (
    <AppShell>
      <PageHeader
        title="Clients"
        breadcrumbs={[{ label: "Sales", to: "/" }, { label: "Clients" }]}
        actions={
          <>
            <Button variant="outline">
              <Download className="size-4" />
              Export
            </Button>
            <ClientFormDialog
              title="Add client"
              trigger={
                <Button>
                  <Plus className="size-4" />
                  Add client
                </Button>
              }
            />
          </>
        }
      />

      <div className="space-y-4 p-4 md:p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total clients" value={String(clients.length)} delta="+10.8%" sub="vs last month 12" />
          <StatCard label="Open receivable" value={currency(receivable)} delta="+12.9%" sub="Across all clients" />
          <StatCard
            label="Active"
            value={String(clients.filter((c) => c.status === "active").length)}
            delta="+3.1%"
            sub="Billing this quarter"
          />
          <StatCard label="Overdue accounts" value="2" delta="-4.2%" trend="down" sub="More than 30 days" />
        </div>

        <section className="panel overflow-hidden">
          <div className="flex flex-wrap items-center gap-2 px-5 py-4">
            <div className="relative flex-1 md:max-w-xs">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search clients" className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="prospect">Prospect</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" aria-label="Filters">
              <Filter className="size-4" />
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="w-10 px-5 py-3">
                    <Checkbox aria-label="Select all" />
                  </th>
                  <th className="px-5 py-3 text-left font-medium">Client</th>
                  <th className="px-5 py-3 text-left font-medium">Contact</th>
                  <th className="px-5 py-3 text-left font-medium">Country</th>
                  <th className="px-5 py-3 text-right font-medium">Balance</th>
                  <th className="px-5 py-3 text-left font-medium">Status</th>
                  <th className="w-10 px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {clients.map((client) => (
                  <tr key={client.id} className="transition-colors hover:bg-muted/40">
                    <td className="px-5 py-3">
                      <Checkbox aria-label={`Select ${client.name}`} />
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-medium text-foreground">{client.name}</p>
                      <p className="text-xs text-muted-foreground">{client.id} · since {client.since}</p>
                    </td>
                    <td className="px-5 py-3">
                      <p className="text-foreground">{client.contact}</p>
                      <p className="text-xs text-muted-foreground">{client.email}</p>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{client.country}</td>
                    <td className="numeric px-5 py-3 text-right font-medium">{currency(client.balance)}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={client.status} />
                    </td>
                    <td className="px-5 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label="Row actions">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <ClientFormDialog
                            title={`Edit ${client.name}`}
                            trigger={
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Pencil className="size-4" />
                                Edit client
                              </DropdownMenuItem>
                            }
                          />
                          <ConfirmDialog
                            title={`Delete ${client.name}?`}
                            description="This removes the client and unlinks their invoices. This cannot be undone."
                            confirmLabel="Delete client"
                            toastMessage="Client deleted"
                            trigger={
                              <DropdownMenuItem
                                variant="destructive"
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Trash2 className="size-4" />
                                Delete
                              </DropdownMenuItem>
                            }
                          />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground">
            <span>Showing {clients.length} of {clients.length} clients</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
