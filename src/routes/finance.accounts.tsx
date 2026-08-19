import { createFileRoute } from "@tanstack/react-router";
import { Download, Plus, Search } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { FormDialog, Field, FieldRow } from "@/components/app/form-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { accounts, currency } from "@/lib/mock-data";

export const Route = createFileRoute("/finance/accounts")({
  head: () => ({
    meta: [
      { title: "Chart of Accounts — Axis Business Hub" },
      {
        name: "description",
        content: "Browse assets, liabilities, equity, revenue and expense accounts with live balances.",
      },
      { property: "og:title", content: "Chart of Accounts — Axis Business Hub" },
      { property: "og:description", content: "Assets, liabilities, equity, revenue and expense accounts." },
    ],
  }),
  component: AccountsPage,
});

const types = ["Asset", "Liability", "Equity", "Revenue", "Expense"];

function AccountsPage() {
  const totalAssets = accounts.filter((a) => a.type === "Asset").reduce((s, a) => s + a.balance, 0);
  const totalLiabilities = accounts.filter((a) => a.type === "Liability").reduce((s, a) => s + a.balance, 0);
  const revenue = accounts.filter((a) => a.type === "Revenue").reduce((s, a) => s + a.balance, 0);
  const expenses = accounts.filter((a) => a.type === "Expense").reduce((s, a) => s + a.balance, 0);

  return (
    <AppShell>
      <PageHeader
        title="Chart of Accounts"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Finance" }, { label: "Chart of Accounts" }]}
        description="The account structure every journal entry posts against."
        actions={
          <>
            <Button variant="outline">
              <Download className="size-4" /> Export
            </Button>
            <FormDialog
              title="New account"
              description="Accounts must have a unique code within the organisation."
              onSubmitToast="Account created"
              trigger={
                <Button>
                  <Plus className="size-4" /> New account
                </Button>
              }
            >
              <FieldRow>
                <Field label="Account code">
                  <Input placeholder="6200" className="numeric" />
                </Field>
                <Field label="Account name">
                  <Input placeholder="Marketing Expense" />
                </Field>
              </FieldRow>
              <FieldRow>
                <Field label="Type">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Normal balance">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Debit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="debit">Debit</SelectItem>
                      <SelectItem value="credit">Credit</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </FieldRow>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium">Show in reports</p>
                  <p className="text-xs text-muted-foreground">Include this account in P&amp;L summaries</p>
                </div>
                <Switch defaultChecked />
              </div>
            </FormDialog>
          </>
        }
      />

      <div className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total assets" value={currency(totalAssets)} delta="+7.9%" sub="Across 3 accounts" />
          <StatCard label="Total liabilities" value={currency(totalLiabilities)} delta="-2.1%" trend="down" sub="Payables and tax" />
          <StatCard label="Revenue" value={currency(revenue)} delta="+12.4%" sub="Year to date" />
          <StatCard label="Expenses" value={currency(expenses)} delta="+5.6%" trend="down" sub="Year to date" />
        </div>

        <div className="panel">
          <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
            <p className="font-display text-sm font-semibold">All accounts</p>
            <div className="relative ml-auto w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search accounts…" className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                {types.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Normal</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((a) => (
                <TableRow key={a.code}>
                  <TableCell className="numeric text-muted-foreground">{a.code}</TableCell>
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell>{a.type}</TableCell>
                  <TableCell className="text-muted-foreground">{a.normal}</TableCell>
                  <TableCell className="numeric text-right">{currency(a.balance)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppShell>
  );
}
