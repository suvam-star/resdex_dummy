import { ChevronRight, Folder, MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";

type Crumb = { label: string; to?: string };

export const AppBreadcrumb = ({
  items,
  rightSlot,
}: {
  items: Crumb[];
  rightSlot?: React.ReactNode;
}) => {
  return (
    <div className="bg-card">
      <div className="mx-auto max-w-[1280px] flex items-center gap-2 px-6 py-3.5 text-sm">
        <Folder className="h-5 w-5 text-brand fill-brand-soft" strokeWidth={1.75} />
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <span key={i} className="flex items-center gap-2">
              {it.to && !last ? (
                <Link to={it.to} className="text-brand hover:underline">
                  {it.label}
                </Link>
              ) : (
                <span className={last ? "text-foreground font-semibold" : "text-brand"}>{it.label}</span>
              )}
              {!last && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
            </span>
          );
        })}
        <div className="ml-auto flex items-center gap-4 text-sm text-muted-foreground">
          {rightSlot}
          <button className="p-1 hover:text-foreground" aria-label="More">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
