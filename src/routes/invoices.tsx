import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Download, Filter, MoreHorizontal, Plus, Search, Send, Trash2 } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { StatusBadge } from "@/components/app/status-badge";
import { FormDialog, Field, FieldRow } from "@/components/app/form-dialog";
import { ConfirmDialog } from "@/components/app/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { clients, currency, invoices } from "@/lib/mock-data";

export const Route = createFileRoute("/invoices")({
  head: () => ({
    meta: [
      { title: "Invoices — Axis Business Hub" },
      {
        name: "description",
        content: "Track issued, sent and overdue invoices with balances, due dates and payment status.",
      },
      { property: "og:title", content: "Invoices — Axis Business Hub" },
      { property: "og:description", content: "Track issued, sent and overdue invoices in Axis Business Hub." },
    ],
  }),
  component: InvoicesPage,
});

function InvoiceFormDialog({ trigger, title }: { trigger: ReactNode; title: string }) {
  return (
    <FormDialog
      trigger={trigger}
      title={title}
      description="Line items post to Sales Revenue and Accounts Receivable."
      wide
      onSubmitToast="Invoice saved"
      submitLabel="Save invoice"
    >
      <FieldRow>
        <Field label="Client">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Invoice number">
          <Input placeholder="INV-1049" />
        </Field>
      </FieldRow>
      <FieldRow>
        <Field label="Issue date">
          <Input type="date" />
        </Field>
        <Field label="Due date">
          <Input type="date" />
        </Field>
      </FieldRow>
      <div className="rounded-lg border border-border">
        <div className="grid grid-cols-[1fr_5rem_7rem] gap-2 border-b border-border bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground">
          <span>Description</span>
          <span>Qty</span>
          <span>Unit price</span>
        </div>
        {[0, 1].map((i) => (
          <div key={i} className="grid grid-cols-[1fr_5rem_7rem] gap-2 px-3 py-2">
            <Input placeholder="Table Virello" />
            <Input placeholder="1" className="numeric" />
            <Input placeholder="1,200" className="numeric" />
          </div>
        ))}
        <div className="px-3 pb-3">
          <Button variant="outline" size="sm" type="button">
            <Plus className="size-4" /> Add line
          </Button>
        </div>
      </div>
      <Field label="Notes">
        <Textarea placeholder="Payment terms, PO reference…" rows={3} />
      </Field>
    </FormDialog>
  );
}

function InvoicesPage() {
  const totals = {
    all: invoices.reduce((s, i) => s + i.amount, 0),
    paid: invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0),
    open: invoices.filter((i) => i.status === "sent").reduce((s, i) => s + i.balance, 0),
    overdue: invoices.filter((i) => i.status === "overdue").reduce((s, i) => s + i.balance, 0),
  };

  return (
    <AppShell>
      <PageHeader
        title="Invoices"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Invoices" }]}
        description="Every invoice raised across your organisations."
        actions={
          <>
            <Button variant="outline">
              <Download className="size-4" /> Export
            </Button>
            <InvoiceFormDialog
              title="New invoice"
              trigger={
                <Button>
                  <Plus className="size-4" /> New invoice
                </Button>
              }
            />
          </>
        }
      />

      <div className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total invoiced" value={currency(totals.all)} delta="+9.1%" sub="6 invoices this period" />
          <StatCard label="Paid" value={currency(totals.paid)} delta="+16.8%" sub="2 settled invoices" />
          <StatCard label="Outstanding" value={currency(totals.open)} delta="+3.4%" sub="Awaiting payment" />
          <StatCard label="Overdue" value={currency(totals.overdue)} delta="-4.2%" trend="down" sub="1 invoice past due" />
        </div>

        <div className="panel">
          <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="sent">Sent</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative ml-auto w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search invoices…" className="pl-9" />
            </div>
            <Button variant="outline" size="icon" aria-label="Filter">
              <Filter className="size-4" />
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead>Due</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Balance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id}>
                  <TableCell className="numeric font-medium">{inv.id}</TableCell>
                  <TableCell>{inv.client}</TableCell>
                  <TableCell className="numeric text-muted-foreground">{inv.issued}</TableCell>
                  <TableCell className="numeric text-muted-foreground">{inv.due}</TableCell>
                  <TableCell className="numeric text-right">{currency(inv.amount)}</TableCell>
                  <TableCell className="numeric text-right">{currency(inv.balance)}</TableCell>
                  <TableCell>
                    <StatusBadge status={inv.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label="Actions">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Send className="size-4" /> Send reminder
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="size-4" /> Download PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                          <Trash2 className="size-4" /> Void invoice
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm text-muted-foreground">
            <span>Showing {invoices.length} of {invoices.length} invoices</span>
            <ConfirmDialog
              trigger={
                <Button variant="outline" size="sm">
                  Bulk void
                </Button>
              }
              title="Void selected invoices?"
              description="Voided invoices remain in the ledger but no longer count towards receivables."
              confirmLabel="Void invoices"
              toastMessage="Invoices voided"
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
