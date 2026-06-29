import { useState } from "react";
import { Copy, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const PhoneReveal = ({ phone, size = "default" }: { phone: string; size?: "default" | "sm" }) => {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(phone);
    setCopied(true);
    toast.success("Phone number copied");
    setTimeout(() => setCopied(false), 1500);
  };

  if (!revealed) {
    return (
      <Button
        variant="outline"
        size={size === "sm" ? "sm" : "default"}
        onClick={() => setRevealed(true)}
        className="border-brand text-brand hover:bg-brand-soft hover:text-brand-soft-foreground gap-2"
      >
        <Lock className="h-3.5 w-3.5" />
        View phone number
      </Button>
    );
  }

  return (
    <div className="fade-in flex items-center gap-2 rounded-md border border-brand/40 bg-brand-soft/40 px-3 h-10 text-sm font-medium text-foreground">
      <span className="tabular-nums">{phone}</span>
      <span className="text-muted-foreground text-xs">(M)</span>
      <button
        onClick={copy}
        className="ml-1 p-1 rounded hover:bg-brand-soft text-muted-foreground hover:text-brand transition-colors"
        aria-label="Copy phone number"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
};

export const VerifiedBadge = () => (
  <div className="fade-in flex items-center gap-1.5 text-xs font-medium text-success">
    <Check className="h-3.5 w-3.5" />
    Verified phone &amp; email
  </div>
);
