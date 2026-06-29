import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Bookmark,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Check,
  Download,
  Eye,
  FileText,
  Forward,
  GraduationCap,
  Home,
  IndianRupee,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  Printer,
  Send,
  Sparkles,
  Video,
  Flag,
  BriefcaseBusiness,
} from "lucide-react";
import { TopNav } from "@/components/TopNav";
import { AppBreadcrumb } from "@/components/AppBreadcrumb";
import { Button } from "@/components/ui/button";
import { getCandidate, similarProfile } from "@/data/candidates";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Skill = ({ name, highlight }: { name: string; highlight?: boolean }) => (
  <span className={cn("inline-flex items-center", highlight && "gap-1")}>
    {highlight && <span className="inline-block h-1.5 w-1.5 rotate-45 bg-brand" />}
    <span className={cn(highlight ? "font-medium text-brand" : "text-foreground/80")}>{name}</span>
  </span>
);

const SkillsList = ({ skills, more }: { skills: string[]; more?: number }) => (
  <div className="text-sm leading-6">
    {skills.map((s, i) => (
      <span key={s}>
        <Skill name={s} highlight={i === 0} />
        {(i < skills.length - 1 || more) && <span className="mx-1.5 text-muted-foreground/60">|</span>}
      </span>
    ))}
    {more ? <button className="text-brand hover:underline">+{more} more</button> : null}
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
    <div className="fade-in inline-flex items-center justify-center gap-2 rounded-md border border-success/50 bg-success/5 px-3 h-10 text-sm font-medium text-foreground">
      <span className="tabular-nums">{phone}</span>
      <span className="text-muted-foreground text-xs">(M)</span>
      <button onClick={copy} className="ml-1 p-0.5 rounded text-muted-foreground hover:text-success" aria-label="Copy phone number">
        {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
};

const CandidateProfile = () => {
  const { slug = "" } = useParams();
  const c = getCandidate(slug);
  const [revealed, setRevealed] = useState(false);
  const [tab, setTab] = useState<"profile" | "cv">("profile");
  const [foldersOpen, setFoldersOpen] = useState(false);
  const [simTab, setSimTab] = useState<"profile" | "viewed">("profile");
  const [saved, setSaved] = useState(false);

  if (!c) {
    return (
      <div className="min-h-screen bg-background">
        <TopNav />
        <main className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h1 className="text-2xl font-semibold">Candidate not found</h1>
          <Link to="/folder/results" className="text-brand hover:underline mt-3 inline-block">
            ← Back to results
          </Link>
        </main>
      </div>
    );
  }

  const breadRight = (
    <>
      <button className="inline-flex items-center gap-1.5 hover:text-foreground"><Printer className="h-4 w-4" /> Print</button>
      <button className="inline-flex items-center gap-1.5 hover:text-foreground"><Flag className="h-4 w-4" /> Report profile</button>
      <span className="h-4 w-px bg-border" />
      <button className="inline-flex items-center gap-1 hover:text-foreground opacity-50"><ChevronLeft className="h-4 w-4" /> Prev</button>
      <button className="inline-flex items-center gap-1 hover:text-foreground">Next <ChevronRight className="h-4 w-4" /></button>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <AppBreadcrumb
        items={[
          { label: "Manage Folders", to: "/folder/results" },
          { label: "23 april SDE 3-5 years", to: "/folder/results" },
          { label: c.name },
        ]}
        rightSlot={breadRight}
      />

      <main className="mx-auto max-w-[1280px] px-6 py-5 slide-in">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
          {/* LEFT */}
          <div className="space-y-4">
            {/* Action toolbar */}
            <div className="flex flex-wrap items-center gap-7 rounded-lg border border-border bg-card px-5 py-3.5">
              <button className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/85 hover:text-brand">
                <Plus className="h-4 w-4" /> Add to <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <button className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/85 hover:text-brand">
                <Send className="h-4 w-4" /> Send NVite
              </button>
              <button className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/85 hover:text-brand">
                <Clock className="h-4 w-4" /> Set reminder <ChevronDown className="h-3.5 w-3.5" />
              </button>
              <button className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/85 hover:text-brand">
                <Forward className="h-4 w-4" /> Forward
              </button>
              <button className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/85 hover:text-brand">
                <Video className="h-4 w-4" /> Schedule video call
              </button>
            </div>

            {/* Profile card */}
            <section className="rounded-lg border border-border bg-card">
              <div className="p-6">
                <div className="flex items-start gap-6">
                  <img
                    src={c.avatar}
                    alt={`${c.name} profile photo`}
                    width={112}
                    height={112}
                    className="h-28 w-28 rounded-full object-cover bg-muted shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h1 className="text-3xl font-bold text-foreground">{c.name}</h1>
                      <button
                        onClick={() => setSaved((s) => !s)}
                        className={cn("inline-flex items-center gap-1.5 text-sm font-medium hover:underline", saved ? "text-brand" : "text-brand")}
                      >
                        <Bookmark className={cn("h-4 w-4", saved && "fill-brand")} /> {saved ? "Saved" : "Save"}
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5"><BriefcaseBusiness className="h-3.5 w-3.5" /> {c.experienceShort}</span>
                      <span className="inline-flex items-center gap-1.5">
                        <IndianRupee className="h-3.5 w-3.5" /> {c.salary.replace("₹", "").trim()}
                        {c.expects && <span className="text-muted-foreground">(expects: {c.expects})</span>}
                      </span>
                      <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {c.location}</span>
                    </div>

                    <dl className="mt-5 grid grid-cols-[140px_1fr] gap-y-2.5 text-sm">
                      <dt className="text-muted-foreground">Current</dt>
                      <dd className="text-foreground/90">
                        {c.currentRole} at {c.company} since {c.since}
                        {c.servingTill && (
                          <span className="ml-3 inline-flex items-center gap-1 text-warning">
                            <Clock className="h-3.5 w-3.5" /> {c.servingTill}
                          </span>
                        )}
                      </dd>

                      <dt className="text-muted-foreground">Highest degree</dt>
                      <dd className="text-foreground/90">{c.education}</dd>

                      <dt className="text-muted-foreground">Pref. locations</dt>
                      <dd className="text-foreground/90">{c.prefLocations.join(", ")}</dd>
                    </dl>

                    {/* Contact row */}
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      {revealed ? (
                        <RevealedPhone phone={c.phone} />
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => setRevealed(true)}
                          className="border-brand text-brand hover:bg-brand-soft hover:text-brand h-10 px-5 font-medium"
                        >
                          View phone number
                        </Button>
                      )}
                      <Button variant="outline" className="border-border bg-card text-foreground hover:bg-muted h-10 gap-2 font-medium">
                        <Phone className="h-4 w-4" /> Call candidate
                      </Button>
                      <Button variant="outline" className="border-border bg-card text-foreground hover:bg-muted h-10 gap-2 font-medium">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#25D366]">
                          <MessageCircle className="h-2.5 w-2.5 text-white fill-white" />
                        </span>
                        WhatsApp
                      </Button>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-3.5 w-3.5" />
                      <span className="text-foreground/80">{c.email}</span>
                      {revealed && (
                        <>
                          <span>·</span>
                          <span className="inline-flex items-center gap-1 text-success font-medium">
                            <Check className="h-3.5 w-3.5" /> Verified phone &amp; email
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Career timeline */}
                <div className="mt-7 px-1">
                  <div className="relative h-1 rounded-full bg-muted">
                    <div className="absolute inset-y-0 left-0 right-0 rounded-full bg-brand/80" />
                    <span className="absolute -top-3 left-0 flex h-7 w-7 items-center justify-center rounded-full bg-card border border-border text-muted-foreground">
                      <GraduationCap className="h-3.5 w-3.5" />
                    </span>
                    <span className="absolute -top-3 left-[28%] flex h-7 w-7 items-center justify-center rounded-full bg-card border border-border text-muted-foreground">
                      <Home className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                    <span>{c.joinedYear}</span>
                    <span className="ml-[24%]">{c.since}</span>
                    <span className="ml-auto">till date</span>
                  </div>
                </div>

                {/* Metadata */}
                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" /> {c.views * 10 + 3}</span>
                    <span className="inline-flex items-center gap-1.5"><Download className="h-3.5 w-3.5" /> 6</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>{c.modified}</span>
                    <span className="text-foreground/80">{c.active}</span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-t border-border px-6">
                <div className="flex gap-7">
                  <button
                    onClick={() => setTab("profile")}
                    className={cn(
                      "relative py-3.5 text-sm font-medium",
                      tab === "profile" ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    Profile detail
                    {tab === "profile" && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent-tab rounded-full" />}
                  </button>
                  <button
                    onClick={() => setTab("cv")}
                    className={cn(
                      "relative py-3.5 text-sm font-medium",
                      tab === "cv" ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    Attached CV
                    {tab === "cv" && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent-tab rounded-full" />}
                  </button>
                </div>
              </div>
            </section>

            {/* Tab content */}
            {tab === "profile" ? (
              <section className="rounded-lg border border-border bg-card p-6 space-y-6 fade-in">
                <div>
                  <h2 className="text-sm font-semibold text-foreground/80 mb-2">Key skills</h2>
                  <SkillsList skills={c.skills} />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground/80 mb-2">May also know</h2>
                  <div className="text-sm text-foreground/80">{c.mayAlsoKnow.join(" | ")}</div>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground/80 mb-2">Experience</h2>
                  <div className="rounded-md border border-border p-4 text-sm">
                    <div className="font-medium">{c.currentRole}</div>
                    <div className="text-muted-foreground">{c.company} · since {c.since}</div>
                  </div>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-foreground/80 mb-2">Education</h2>
                  <div className="rounded-md border border-border p-4 text-sm text-muted-foreground">{c.education}</div>
                </div>
              </section>
            ) : (
              <section className="rounded-lg border border-border bg-card p-12 text-center fade-in">
                <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
                <p className="mt-3 text-sm text-muted-foreground">CV preview unavailable in this demo.</p>
              </section>
            )}
          </div>

          {/* RIGHT */}
          <aside className="space-y-4">
            <div className="rounded-lg border border-border bg-card">
              <button
                onClick={() => setFoldersOpen((o) => !o)}
                className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold"
              >
                Exists in 2 Folders
                <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", !foldersOpen && "-rotate-90")} />
              </button>
              {foldersOpen && (
                <div className="border-t border-border px-5 py-3 text-sm text-muted-foreground space-y-1.5 fade-in">
                  <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand" /> 23 april SDE 3-5 years</div>
                  <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-brand" /> GenAI Shortlist Q2</div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border bg-card px-5 py-4">
              <div className="text-sm font-medium text-foreground/80">No comments</div>
              <button className="text-sm text-brand font-medium hover:underline">Add comments</button>
            </div>

            <div className="rounded-lg border border-border bg-card overflow-hidden">
              <div className="flex items-center justify-between bg-gradient-to-r from-[hsl(var(--gradient-from)/0.06)] to-[hsl(var(--gradient-to)/0.06)] px-5 py-3.5 border-b border-border">
                <div className="inline-flex items-center gap-1.5 text-sm font-semibold">
                  <Sparkles className="h-4 w-4 text-[hsl(var(--gradient-from))]" />
                  <span className="gradient-text">AI matched</span>
                  <span className="text-foreground">similar profiles</span>
                </div>
                <a href="#" className="text-sm text-brand font-medium hover:underline">View all</a>
              </div>
              <div className="flex border-b border-border px-5">
                <button
                  onClick={() => setSimTab("profile")}
                  className={cn(
                    "relative py-3 text-sm font-medium pr-6",
                    simTab === "profile" ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  Profile details (100)
                  {simTab === "profile" && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent-tab rounded-full" />}
                </button>
                <button
                  onClick={() => setSimTab("viewed")}
                  className={cn(
                    "relative py-3 text-sm font-medium",
                    simTab === "viewed" ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Recruiters also viewed (210)
                  {simTab === "viewed" && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent-tab rounded-full" />}
                </button>
              </div>

              <div className="p-4">
                <div className="rounded-md p-3 hover:bg-card-hover transition-colors">
                  <div className="flex items-start gap-3">
                    <img
                      src={similarProfile.avatar}
                      alt={`${similarProfile.name} profile photo`}
                      loading="lazy"
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full object-cover bg-muted shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold tracking-wide">{similarProfile.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{similarProfile.title}</div>
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><BriefcaseBusiness className="h-3 w-3" /> {similarProfile.experience}</span>
                        <span className="inline-flex items-center gap-1"><IndianRupee className="h-3 w-3" /> {similarProfile.salary.replace("₹", "").trim()}</span>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {similarProfile.location} (prefers {similarProfile.prefLocations.join(",")}…)
                      </div>
                      <div className="mt-2.5">
                        <SkillsList skills={similarProfile.skills} more={similarProfile.moreSkills} />
                      </div>
                      <div className="mt-3 flex items-center justify-end gap-3 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><FileText className="h-3 w-3" /> CV</span>
                        <span className="text-foreground/80">Active yesterday</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default CandidateProfile;
