import { ArrowDownRight, ArrowUpRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  trend = "up",
  sub,
  className,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down";
  sub?: string;
  className?: string;
}) {
  const Arrow = trend === "up" ? ArrowUpRight : ArrowDownRight;
  return (
    <div className={cn("panel p-5", className)}>
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <MoreHorizontal className="size-4 text-muted-foreground/60" />
      </div>
      <p className="numeric mt-3 text-2xl font-semibold text-foreground">{value}</p>
      <div className="mt-2 flex items-center justify-between gap-2">
        {sub && <span className="truncate text-xs text-muted-foreground">{sub}</span>}
        {delta && (
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
              trend === "up" ? "bg-success-soft text-success" : "bg-destructive-soft text-destructive",
            )}
          >
            <Arrow className="size-3" />
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}
