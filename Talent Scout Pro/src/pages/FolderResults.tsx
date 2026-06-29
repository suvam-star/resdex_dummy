import { ChevronDown, ChevronLeft, ChevronRight, MoreVertical, Plus, Clock, Info } from "lucide-react";
import { TopNav } from "@/components/TopNav";
import { AppBreadcrumb } from "@/components/AppBreadcrumb";
import { CandidateCard } from "@/components/CandidateCard";
import { Checkbox } from "@/components/ui/checkbox";
import { candidates } from "@/data/candidates";

const FolderResults = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <AppBreadcrumb
        items={[
          { label: "Manage Folders", to: "/folder/results" },
          { label: "23 april SDE 3-5 years" },
        ]}
      />

      <div className="bg-card border-b border-border">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="flex items-center gap-8">
            <button className="relative py-3 text-sm font-semibold">
              Profiles <span className="text-muted-foreground font-normal ml-0.5">32</span>
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent-tab rounded-full" />
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-[1280px] px-6 py-5 slide-in">
        <h1 className="sr-only">Candidate search results</h1>

        {/* Show / pagination row */}
        <div className="flex items-center justify-end gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <button className="inline-flex items-center gap-1 rounded border border-border bg-card px-2 h-7 text-foreground">
              40 <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1 hover:text-foreground" aria-label="First"><ChevronLeft className="h-3.5 w-3.5" /><ChevronLeft className="h-3.5 w-3.5 -ml-2.5" /></button>
            <button className="p-1 hover:text-foreground" aria-label="Prev"><ChevronLeft className="h-4 w-4" /></button>
            <button className="inline-flex items-center rounded border border-border bg-card px-2 h-7 text-foreground">
              Page 1 of 1
            </button>
            <button className="p-1 hover:text-foreground" aria-label="Next"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>

        {/* Action row */}
        <div className="mb-4 flex flex-wrap items-center gap-5 rounded-lg border border-border bg-card px-4 py-2.5">
          <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox className="h-4 w-4 rounded-[3px]" /> Select all
          </label>
          <button className="inline-flex items-center gap-1.5 text-sm text-foreground/80 hover:text-brand">
            <Plus className="h-4 w-4" /> Add to <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <button className="inline-flex items-center gap-1.5 text-sm text-foreground/80 hover:text-brand">
            <Clock className="h-4 w-4" /> Set reminder <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <button className="p-1 hover:text-foreground" aria-label="More">
            <MoreVertical className="h-4 w-4" />
          </button>

          <div className="ml-auto inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            Want to email candidates?{" "}
            <a href="#" className="text-brand font-medium hover:underline">
              Switch to NVite
            </a>
            <Info className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {candidates.map((c) => (
            <CandidateCard key={c.slug} candidate={c} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default FolderResults;
