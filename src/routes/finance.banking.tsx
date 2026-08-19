import { createFileRoute } from "@tanstack/react-router";
import { Building, Plus, RefreshCw } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { StatusBadge } from "@/components/app/status-badge";
import { FormDialog, Field, FieldRow } from "@/components/app/form-dialog";
import { ConfirmDialog } from "@/components/app/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { bankAccounts, currency, transactions } from "@/lib/mock-data";

export const Route = createFileRoute("/finance/banking")({
  head: () => ({
    meta: [
      { title: "Banking — Axis Business Hub" },
      {
        name: "description",
        content: "Connected bank accounts, balances, sync status and reconciliation progress in one place.",
      },
      { property: "og:title", content: "Banking — Axis Business Hub" },
      { property: "og:description", content: "Connected bank accounts, balances and reconciliation progress." },
    ],
  }),
  component: BankingPage,
});

function BankingPage() {
  const total = bankAccounts.reduce((s, b) => s + b.balance, 0);
  const reconciled = transactions.filter((t) => t.reconciled).length;
  const pct = Math.round((reconciled / transactions.length) * 100);

  return (
    <AppShell>
      <PageHeader
        title="Banking"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Finance" }, { label: "Banking" }]}
        description="Balances and sync health for every connected account."
        actions={
          <>
            <Button variant="outline">
              <RefreshCw className="size-4" /> Sync all
            </Button>
            <FormDialog
              title="Connect bank account"
              description="We use read-only access to import transactions."
              onSubmitToast="Bank account connected"
              submitLabel="Connect"
              trigger={
                <Button>
                  <Plus className="size-4" /> Add account
                </Button>
              }
            >
              <Field label="Bank">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Standard Chartered", "Equity Bank", "Wise", "KCB", "Revolut Business"].map((b) => (
                      <SelectItem key={b} value={b}>
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <FieldRow>
                <Field label="Nickname">
                  <Input placeholder="Operating" />
                </Field>
                <Field label="Account number">
                  <Input placeholder="•••• 4471" className="numeric" />
                </Field>
              </FieldRow>
              <FieldRow>
                <Field label="Currency">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="USD" />
                    </SelectTrigger>
                    <SelectContent>
                      {["USD", "EUR", "KES", "AED"].map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Opening balance">
                  <Input placeholder="0.00" className="numeric" />
                </Field>
              </FieldRow>
            </FormDialog>
          </>
        }
      />

      <div className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Cash on hand" value={currency(total)} delta="+6.1%" sub="Across 3 accounts" />
          <StatCard label="Reconciled" value={`${pct}%`} delta="+12%" sub={`${reconciled} of ${transactions.length} transactions`} />
          <StatCard label="Needs attention" value="1" delta="Wise" trend="down" sub="Sync failed 3 days ago" />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {bankAccounts.map((b) => (
            <div key={b.id} className="panel p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-lg bg-primary-soft text-primary">
                    <Building className="size-5" />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold">{b.bank}</p>
                    <p className="numeric text-xs text-muted-foreground">
                      {b.nickname} · {b.number}
                    </p>
                  </div>
                </div>
                <StatusBadge status={b.status} />
              </div>
              <p className="numeric mt-4 text-2xl font-semibold">{currency(b.balance)}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {b.currency} · synced {b.lastSync}
              </p>
              <Progress value={b.status === "connected" ? 92 : 34} className="mt-4" />
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <RefreshCw className="size-4" /> Sync
                </Button>
                <ConfirmDialog
                  trigger={
                    <Button variant="outline" size="sm" className="flex-1">
                      Disconnect
                    </Button>
                  }
                  title={`Disconnect ${b.bank}?`}
                  description="Historic transactions stay in your ledger, but new ones stop importing."
                  confirmLabel="Disconnect"
                  toastMessage="Bank account disconnected"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="panel">
          <div className="border-b border-border p-4">
            <p className="font-display text-sm font-semibold">Recent bank feed</p>
            <p className="text-xs text-muted-foreground">Latest imported transactions awaiting review</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Account</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.slice(0, 5).map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="numeric text-muted-foreground">{t.date}</TableCell>
                  <TableCell className="font-medium">{t.description}</TableCell>
                  <TableCell className="text-muted-foreground">{t.account}</TableCell>
                  <TableCell className="numeric text-right">{currency(t.amount)}</TableCell>
                  <TableCell>
                    <StatusBadge status={t.reconciled ? "posted" : "draft"} />
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
