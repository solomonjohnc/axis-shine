import { createFileRoute } from "@tanstack/react-router";
import { Download, MoreHorizontal, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { StatusBadge } from "@/components/app/status-badge";
import { FormDialog, Field, FieldRow } from "@/components/app/form-dialog";
import { ConfirmDialog } from "@/components/app/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { currency, employees } from "@/lib/mock-data";

export const Route = createFileRoute("/employees")({
  head: () => ({
    meta: [
      { title: "Employees — Axis Business Hub" },
      {
        name: "description",
        content: "Employee directory with roles, departments, salaries and payroll status.",
      },
      { property: "og:title", content: "Employees — Axis Business Hub" },
      { property: "og:description", content: "Employee directory with roles, departments and payroll status." },
    ],
  }),
  component: EmployeesPage,
});

const departments = ["Finance", "Sales", "Operations", "Engineering"];

function EmployeeFormDialog({ trigger, title }: { trigger: React.ReactNode; title: string }) {
  return (
    <FormDialog trigger={trigger} title={title} description="Employees appear in payroll runs and expense approvals." wide onSubmitToast="Employee saved">
      <FieldRow>
        <Field label="Full name">
          <Input placeholder="Daniel Kim" />
        </Field>
        <Field label="Work email">
          <Input type="email" placeholder="daniel@axisholdings.co" />
        </Field>
      </FieldRow>
      <FieldRow>
        <Field label="Role">
          <Input placeholder="Finance Lead" />
        </Field>
        <Field label="Department">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </FieldRow>
      <FieldRow>
        <Field label="Annual salary" hint="Gross, before deductions">
          <Input placeholder="96,000" className="numeric" />
        </Field>
        <Field label="Start date">
          <Input type="date" />
        </Field>
      </FieldRow>
    </FormDialog>
  );
}

function EmployeesPage() {
  const payroll = employees.reduce((s, e) => s + e.salary, 0);
  const active = employees.filter((e) => e.status === "active").length;

  return (
    <AppShell>
      <PageHeader
        title="Employees"
        breadcrumbs={[{ label: "Home", to: "/" }, { label: "People" }, { label: "Employees" }]}
        description="Your team, their departments and payroll exposure."
        actions={
          <>
            <Button variant="outline">
              <Download className="size-4" /> Export
            </Button>
            <EmployeeFormDialog
              title="Add employee"
              trigger={
                <Button>
                  <Plus className="size-4" /> Add employee
                </Button>
              }
            />
          </>
        }
      />

      <div className="space-y-6 p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Headcount" value={String(employees.length)} delta="+1" sub="1 joined this year" />
          <StatCard label="Active" value={String(active)} delta="Stable" sub="1 on leave" />
          <StatCard label="Annual payroll" value={currency(payroll)} delta="+6.3%" sub="Gross salaries" />
          <StatCard label="Avg. salary" value={currency(Math.round(payroll / employees.length))} delta="+2.1%" sub="Across all departments" />
        </div>

        <div className="panel">
          <div className="flex flex-wrap items-center gap-3 border-b border-border p-4">
            <p className="font-display text-sm font-semibold">Directory</p>
            <div className="relative ml-auto w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search employees…" className="pl-9" />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="All departments" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Start date</TableHead>
                <TableHead className="text-right">Salary</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="bg-primary-soft text-xs text-primary">
                          {e.name
                            .split(" ")
                            .map((p) => p[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{e.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{e.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{e.role}</TableCell>
                  <TableCell className="text-muted-foreground">{e.department}</TableCell>
                  <TableCell className="numeric text-muted-foreground">{e.start}</TableCell>
                  <TableCell className="numeric text-right">{currency(e.salary)}</TableCell>
                  <TableCell>
                    <StatusBadge status={e.status} />
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
                          <Pencil className="size-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                          <Trash2 className="size-4" /> Offboard
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm text-muted-foreground">
            <span>{employees.length} employees</span>
            <ConfirmDialog
              trigger={
                <Button variant="outline" size="sm">
                  Run payroll
                </Button>
              }
              title="Run August payroll?"
              description="This posts a payroll journal entry and schedules payments from the Payroll account."
              confirmLabel="Run payroll"
              toastMessage="Payroll scheduled"
            />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
