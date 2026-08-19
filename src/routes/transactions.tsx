import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownLeft, ArrowUpRight, Download, Filter, Plus, Search } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { FormDialog, Field, FieldRow } from "@/components/app/form-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { bankAccounts, currency, transactions } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/transactions")({
  head: () => ({
    meta: [
      { title: "Transactions — Axis Business Hub" },
      {
        name: "description",
        content: "Review bank transactions, categorise spend and reconcile inflows and outflows.",
      },
      { property: "og:title", content: "Transactions — Axis Business Hub" },
      { property: "og:description", content: "Review and reconcile bank transactions in Axis Business Hub." },
    ],
  }),
  component: TransactionsPage,
});

function TransactionsPage() {
  const inflow = transactions.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const outflow = transactions.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0);
  const unreconciled = transactions.filter((t) => !t.reconciled).length;

  return (
    <AppShell>
      <PageHeader
        title="Transactions"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Transactions" }]}
        description="All money movement across connected bank accounts."
        actions={
          <>
            <Button variant="outline">
              <Download className="size-4" /> Export CSV
            </Button>
            <FormDialog
              title="Record transaction"
              description="Manual entries are flagged for reconciliation."
              onSubmitToast="Transaction recorded"
              trigger={
                <Button>
                  <Plus className="size-4" /> Add transaction
                </Button>
              }
            >
              <FieldRow>
                <Field label="Date">
                  <Input type="date" />
                </Field>
                <Field label="Amount">
                  <Input placeholder="1,200" className="numeric" />
                </Field>
              </FieldRow>
              <Field label="Description">
                <Input placeholder="Card payment — Qatar Furniture" />
              </Field>
              <FieldRow>
                <Field label="Bank account">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {bankAccounts.map((b) => (
                        <SelectItem key={b.id} value={b.id}>
                          {b.bank} {b.number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Category">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Sales income", "Software", "Payroll", "Rent", "Internal transfer"].map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </FieldRow>
              <Field label="Memo">
                <Textarea rows={3} placeholder="Optional note for the audit trail" />
              </Field>
            </FormDialog>
          </>
        }
      />

      <div className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Money in" value={currency(inflow)} delta="+11.2%" sub="This period" />
          <StatCard label="Money out" value={currency(outflow)} delta="-6.4%" trend="down" sub="This period" />
          <StatCard label="Net movement" value={currency(inflow + outflow)} delta="+4.8%" sub="Inflow minus outflow" />
          <StatCard
            label="Unreconciled"
            value={String(unreconciled)}
            delta="2 new"
            trend="down"
            sub="Needs your review"
          />
        </div>

        <div className="panel">
          <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
            <p className="font-display text-sm font-semibold">Activity</p>
            <div className="relative ml-auto w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search transactions…" className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="All accounts" />
              </SelectTrigger>
              <SelectContent>
                {bankAccounts.map((b) => (
                  <SelectItem key={b.id} value={b.id}>
                    {b.bank} {b.number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" aria-label="Filter">
              <Filter className="size-4" />
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox aria-label="Select all" />
                </TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Reconciled</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell>
                    <Checkbox aria-label={`Select ${tx.id}`} />
                  </TableCell>
                  <TableCell className="numeric text-muted-foreground">{tx.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "grid size-7 place-items-center rounded-full",
                          tx.amount > 0 ? "bg-success-soft text-success" : "bg-destructive-soft text-destructive",
                        )}
                      >
                        {tx.amount > 0 ? <ArrowDownLeft className="size-3.5" /> : <ArrowUpRight className="size-3.5" />}
                      </span>
                      <span className="font-medium">{tx.description}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{tx.account}</TableCell>
                  <TableCell className="text-muted-foreground">{tx.category}</TableCell>
                  <TableCell
                    className={cn("numeric text-right font-medium", tx.amount > 0 ? "text-success" : "text-foreground")}
                  >
                    {currency(tx.amount)}
                  </TableCell>
                  <TableCell>
                    <Checkbox defaultChecked={tx.reconciled} aria-label="Reconciled" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppShell>
  );
}
