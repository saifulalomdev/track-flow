import { cn } from "~/lib/utils";

interface PlanUsageProps {
  label: string;
  current: number;
  limit: number;
}

export function PlanUsageStats({ label, current, limit }: PlanUsageProps) {
  const percentage = Math.round((current / limit) * 100);
  const isWarning = percentage >= 80;

  return (
    <div className="px-3 py-4 rounded-lg bg-primary/5 border border-primary/10">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold text-primary uppercase">{label}</span>

        <span className={cn(
          "text-xs",
          isWarning ? "text-orange-400 font-bold" : "text-muted-foreground"
        )}>
          {percentage}%
        </span>
      </div>

      {/* progress bar */}
      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <div className={cn("h-full transition-all duration-500", isWarning ? "bg-orange-400" : "bg-primary")} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}