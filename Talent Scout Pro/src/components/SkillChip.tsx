import { cn } from "@/lib/utils";

export const SkillChip = ({ children, variant = "primary" }: { children: React.ReactNode; variant?: "primary" | "muted" }) => (
  <span
    className={cn(
      "inline-flex items-center rounded px-2 py-0.5 text-xs font-medium",
      variant === "primary"
        ? "bg-brand-soft text-brand-soft-foreground"
        : "bg-muted text-muted-foreground",
    )}
  >
    {children}
  </span>
);
