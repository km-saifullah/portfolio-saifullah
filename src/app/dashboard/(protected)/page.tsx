import Link from "next/link";
import { FolderKanban, Newspaper, Plus } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import Blog from "@/models/Blog";

export default async function DashboardOverview() {
  await connectDB();
  const [projectCount, blogCount] = await Promise.all([
    Project.countDocuments(),
    Blog.countDocuments(),
  ]);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Overview</h1>
      <p className="mt-2 text-text-muted">
        Manage your projects and blog posts.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 max-w-2xl">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="flex items-center justify-between">
            <FolderKanban className="text-green-bright" size={22} />
            <span className="font-display text-3xl font-semibold">
              {projectCount}
            </span>
          </div>
          <p className="mt-3 font-mono text-xs text-text-muted uppercase tracking-wide">
            Projects
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              href="/dashboard/projects"
              className="text-sm text-text-muted hover:text-green-bright transition-colors"
            >
              Manage
            </Link>
            <Link
              href="/dashboard/projects/new"
              className="flex items-center gap-1 text-sm text-green-bright hover:text-green transition-colors"
            >
              <Plus size={14} /> New
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="flex items-center justify-between">
            <Newspaper className="text-green-bright" size={22} />
            <span className="font-display text-3xl font-semibold">
              {blogCount}
            </span>
          </div>
          <p className="mt-3 font-mono text-xs text-text-muted uppercase tracking-wide">
            Blog posts
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              href="/dashboard/blogs"
              className="text-sm text-text-muted hover:text-green-bright transition-colors"
            >
              Manage
            </Link>
            <Link
              href="/dashboard/blogs/new"
              className="flex items-center gap-1 text-sm text-green-bright hover:text-green transition-colors"
            >
              <Plus size={14} /> New
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
