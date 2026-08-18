import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusPill = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
  {
    variants: {
      tone: {
        neutral: "bg-muted text-muted-foreground",
        info: "bg-primary-soft text-primary",
        success: "bg-success-soft text-success",
        warning: "bg-warning-soft text-warning-foreground",
        danger: "bg-destructive-soft text-destructive",
        teal: "bg-teal-soft text-teal-foreground",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

const toneMap: Record<string, VariantProps<typeof statusPill>["tone"]> = {
  paid: "success",
  active: "success",
  connected: "success",
  posted: "success",
  healthy: "success",
  sent: "info",
  prospect: "info",
  invited: "info",
  draft: "neutral",
  archived: "neutral",
  disconnected: "neutral",
  "—": "neutral",
  "on leave": "warning",
  low: "warning",
  "needs attention": "warning",
  overdue: "danger",
  critical: "danger",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const tone = toneMap[status.toLowerCase()] ?? "neutral";
  return (
    <span className={cn(statusPill({ tone }), className)}>
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}
