import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Bookmark,
  BriefcaseBusiness,
  Check,
  Clock,
  Copy,
  Download,
  Eye,
  FileText,
  FilePlus2,
  IndianRupee,
  MapPin,
  MessageSquare,
  Phone,
  Share2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Candidate } from "@/data/candidates";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Skill = ({ name, highlight }: { name: string; highlight?: boolean }) => (
  <span className={cn("inline-flex items-center", highlight && "gap-1 text-brand")}>
    {highlight && <span className="inline-block h-1.5 w-1.5 rotate-45 bg-brand" />}
    <span className={cn(highlight ? "font-medium text-brand" : "text-foreground/80")}>{name}</span>
  </span>
);

const SkillsList = ({ skills }: { skills: string[] }) => (
  <div className="text-sm leading-6">
    {skills.map((s, i) => (
      <span key={s}>
        <Skill name={s} highlight={i === 0} />
        {i < skills.length - 1 && <span className="mx-1.5 text-muted-foreground/60">|</span>}
      </span>
    ))}
  </div>
);

const RevealedPhone = ({ phone }: { phone: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(phone);
    setCopied(true);
    toast.success("Phone number copied");
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="fade-in inline-flex items-center justify-center gap-2 rounded-md border border-success/50 bg-success/5 px-3 h-9 text-sm font-medium text-foreground">
      <span className="tabular-nums">{phone}</span>
      <span className="text-muted-foreground text-xs">(M)</span>
      <button
        onClick={copy}
        className="ml-1 p-0.5 rounded text-muted-foreground hover:text-success transition-colors"
        aria-label="Copy phone number"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
};

export const CandidateCard = ({ candidate }: { candidate: Candidate }) => {
  const [selected, setSelected] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [revealed, setRevealed] = useState(false);

  return (
    <article className="group relative flex gap-0 overflow-hidden rounded-lg border border-border bg-card shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-colors hover:bg-card-hover">
      {/* Selection corner ribbon */}
      {selected && (
        <div className="absolute left-0 top-0 z-10">
          <div className="corner-ribbon" />
          <Check className="absolute left-1 top-0.5 h-3 w-3 text-brand-foreground" strokeWidth={3} />
        </div>
      )}

      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 gap-4 p-5 pl-7">
          {/* Checkbox */}
          <div className="pt-1">
            <Checkbox
              checked={selected}
              onCheckedChange={(v) => setSelected(!!v)}
              className="h-4 w-4 rounded-[3px]"
            />
          </div>

          {/* Main */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <Link
                to={`/profile/${candidate.slug}`}
                className="text-lg font-semibold text-foreground hover:text-brand"
              >
                {candidate.name}
              </Link>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <BriefcaseBusiness className="h-3.5 w-3.5" /> {candidate.experience}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <IndianRupee className="h-3.5 w-3.5" /> {candidate.salary.replace("₹", "").trim()}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> {candidate.location}
              </span>
            </div>

            {/* Detail grid */}
            <dl className="mt-4 grid grid-cols-[140px_1fr] gap-y-2.5 text-sm">
              <dt className="text-muted-foreground">Current</dt>
              <dd className="text-foreground/90">
                {candidate.currentRole} at {candidate.company}
              </dd>

              <dt className="text-muted-foreground">Education</dt>
              <dd className="text-foreground/90">{candidate.education}</dd>

              <dt className="text-muted-foreground">Pref. locations</dt>
              <dd className="text-foreground/90">{candidate.prefLocations.join(", ")}</dd>

              <dt className="text-muted-foreground pt-0.5">Key skills</dt>
              <dd>
                <SkillsList skills={candidate.skills} />
              </dd>

              <dt className="text-muted-foreground">May also know</dt>
              <dd className="text-sm text-foreground/80">
                {candidate.mayAlsoKnow.slice(0, 4).join(" | ")}
                {candidate.mayAlsoKnow.length > 4 && (
                  <button className="ml-2 text-brand hover:underline">more</button>
                )}
              </dd>
            </dl>

            <div className="mt-4">
              <button className="text-sm text-brand hover:underline">
                {candidate.similarCount * 26} similar profiles
              </button>
            </div>
          </div>

          {/* Right column */}
          <div className="hidden lg:flex w-[260px] shrink-0 flex-col items-center gap-3 pl-4">
            <img
              src={candidate.avatar}
              alt={`${candidate.name} profile photo`}
              loading="lazy"
              width={80}
              height={80}
              className="h-20 w-20 rounded-full object-cover bg-muted"
            />
            <p className="text-center text-xs text-muted-foreground leading-snug px-2">
              {candidate.aiBlurb}
            </p>
            <div className="flex flex-col gap-2 w-full pt-1">
              {revealed ? (
                <RevealedPhone phone={candidate.phone} />
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setRevealed(true)}
                  className="border-brand text-brand hover:bg-brand-soft hover:text-brand h-9 font-medium"
                >
                  View phone number
                </Button>
              )}

              <Button
                variant="outline"
                className="border-border bg-card text-foreground hover:bg-muted h-9 gap-2 font-medium"
              >
                <Phone className="h-4 w-4" /> Call candidate
              </Button>
              <div className="text-center text-[11px] text-muted-foreground">
                Verified phone &amp; email
              </div>
            </div>

            <button className="mt-1 inline-flex items-center gap-1 text-sm text-brand hover:underline">
              <MessageSquare className="h-3.5 w-3.5" /> Comment
            </button>
          </div>

          {/* Vertical icon rail */}
          <div className="hidden lg:flex flex-col items-center gap-4 border-l border-border pl-3 pt-2 text-muted-foreground">
            <button className="hover:text-brand" aria-label="Add to folder"><FilePlus2 className="h-4 w-4" /></button>
            <button className="hover:text-brand" aria-label="Share"><Share2 className="h-4 w-4" /></button>
            <button className="hover:text-brand" aria-label="History"><Clock className="h-4 w-4" /></button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-border px-5 py-2.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" /> {candidate.views * 10 + 1}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Download className="h-3.5 w-3.5" /> {candidate.views - 2 > 0 ? candidate.views - 2 : 6}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <button className="inline-flex items-center gap-1 hover:text-brand" aria-label="CV">
              <FileText className="h-3.5 w-3.5" /> CV
            </button>
            <button
              onClick={() => setBookmarked((b) => !b)}
              className={cn("hover:text-brand", bookmarked && "text-brand")}
              aria-label="Bookmark"
            >
              <Bookmark className={cn("h-3.5 w-3.5", bookmarked && "fill-brand")} />
            </button>
            <span>{candidate.modified}</span>
            <span className="text-foreground/80">{candidate.active}</span>
          </div>
        </div>
      </div>

      {/* hidden import to silence unused */}
      <Sparkles className="hidden" />
    </article>
  );
};
