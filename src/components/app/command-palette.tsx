import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  BookOpen,
  Building2,
  CreditCard,
  FileText,
  LayoutDashboard,
  Plug,
  Receipt,
  Settings,
  Users,
  Wallet,
} from "lucide-react";

const links = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Clients", to: "/clients", icon: Building2 },
  { label: "Invoices", to: "/invoices", icon: FileText },
  { label: "Transactions", to: "/transactions", icon: Receipt },
  { label: "Chart of Accounts", to: "/finance/accounts", icon: Wallet },
  { label: "General Ledger", to: "/finance/ledger", icon: BookOpen },
  { label: "Banking", to: "/finance/banking", icon: CreditCard },
  { label: "Employees", to: "/employees", icon: Users },
  { label: "Settings", to: "/settings", icon: Settings },
  { label: "Connections", to: "/settings/connections", icon: Plug },
];

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const navigate = useNavigate();

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search pages, clients, invoices…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {links.map((link) => (
            <CommandItem
              key={link.to}
              value={link.label}
              onSelect={() => {
                onOpenChange(false);
                navigate({ to: link.to });
              }}
            >
              <link.icon className="size-4" />
              {link.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick actions">
          <CommandItem
            value="New invoice"
            onSelect={() => {
              onOpenChange(false);
              navigate({ to: "/invoices" });
            }}
          >
            <FileText className="size-4" />
            New invoice
            <CommandShortcut>⌘I</CommandShortcut>
          </CommandItem>
          <CommandItem
            value="New client"
            onSelect={() => {
              onOpenChange(false);
              navigate({ to: "/clients" });
            }}
          >
            <Building2 className="size-4" />
            New client
            <CommandShortcut>⌘K</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export function useCommandPalette() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  return { open, setOpen };
}
