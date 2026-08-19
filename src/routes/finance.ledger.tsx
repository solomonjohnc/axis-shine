import { createFileRoute } from "@tanstack/react-router";
import { Download, Plus, Search } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { StatusBadge } from "@/components/app/status-badge";
import { FormDialog, Field, FieldRow } from "@/components/app/form-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { accounts, currency, journalEntries } from "@/lib/mock-data";

export const Route = createFileRoute("/finance/ledger")({
  head: () => ({
    meta: [
      { title: "General Ledger — Axis Business Hub" },
      {
        name: "description",
        content: "Post and review double-entry journal entries with debits, credits and posting status.",
      },
      { property: "og:title", content: "General Ledger — Axis Business Hub" },
      { property: "og:description", content: "Double-entry journal entries with debits, credits and status." },
    ],
  }),
  component: LedgerPage,
});

function LedgerPage() {
  const debits = journalEntries.reduce((s, j) => s + j.debit, 0);
  const credits = journalEntries.reduce((s, j) => s + j.credit, 0);

  return (
    <AppShell>
      <PageHeader
        title="General Ledger"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "Finance" }, { label: "General Ledger" }]}
        description="Journal entries posted against your chart of accounts."
        actions={
          <>
            <Button variant="outline">
              <Download className="size-4" /> Export
            </Button>
            <FormDialog
              title="New journal entry"
              description="Debits must equal credits before an entry can post."
              wide
              submitLabel="Post entry"
              onSubmitToast="Journal entry posted"
              trigger={
                <Button>
                  <Plus className="size-4" /> New entry
                </Button>
              }
            >
              <FieldRow>
                <Field label="Date">
                  <Input type="date" />
                </Field>
                <Field label="Reference">
                  <Input placeholder="JE-0220" className="numeric" />
                </Field>
              </FieldRow>
              <Field label="Memo">
                <Input placeholder="August payroll accrual" />
              </Field>
              <div className="rounded-lg border border-border">
                <div className="grid grid-cols-[1fr_7rem_7rem] gap-2 border-b border-border bg-muted/50 px-3 py-2 text-xs font-medium text-muted-foreground">
                  <span>Account</span>
                  <span>Debit</span>
                  <span>Credit</span>
                </div>
                {[0, 1].map((i) => (
                  <div key={i} className="grid grid-cols-[1fr_7rem_7rem] gap-2 px-3 py-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent>
                        {accounts.map((a) => (
                          <SelectItem key={a.code} value={a.code}>
                            {a.code} · {a.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input placeholder="0.00" className="numeric" />
                    <Input placeholder="0.00" className="numeric" />
                  </div>
                ))}
                <div className="flex items-center justify-between border-t border-border px-3 py-2 text-sm">
                  <Button variant="outline" size="sm" type="button">
                    <Plus className="size-4" /> Add line
                  </Button>
                  <span className="numeric text-muted-foreground">Difference: $0.00</span>
                </div>
              </div>
              <Field label="Notes">
                <Textarea rows={3} placeholder="Supporting detail for auditors" />
              </Field>
            </FormDialog>
          </>
        }
      />

      <div className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Total debits" value={currency(debits)} delta="+8.2%" sub="This period" />
          <StatCard label="Total credits" value={currency(credits)} delta="+8.2%" sub="This period" />
          <StatCard label="Out of balance" value="$0" delta="Balanced" sub="All posted entries reconcile" />
        </div>

        <div className="panel">
          <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
            <p className="font-display text-sm font-semibold">Journal entries</p>
            <div className="relative ml-auto w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search entries…" className="pl-9" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entry</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Memo</TableHead>
                <TableHead className="text-right">Lines</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {journalEntries.map((j) => (
                <TableRow key={j.id}>
                  <TableCell className="numeric font-medium">{j.id}</TableCell>
                  <TableCell className="numeric text-muted-foreground">{j.date}</TableCell>
                  <TableCell>{j.memo}</TableCell>
                  <TableCell className="numeric text-right text-muted-foreground">{j.lines}</TableCell>
                  <TableCell className="numeric text-right">{currency(j.debit)}</TableCell>
                  <TableCell className="numeric text-right">{currency(j.credit)}</TableCell>
                  <TableCell>
                    <StatusBadge status={j.status} />
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
