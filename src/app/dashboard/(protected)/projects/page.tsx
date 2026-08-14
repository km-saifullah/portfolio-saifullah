import Link from "next/link";
import { Plus, Pencil, Star } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import DeleteButton from "@/components/dashboard/DeleteButton";

export const dynamic = "force-dynamic";

export default async function ProjectsListPage() {
  await connectDB();
  const projects = await Project.find({})
    .sort({ order: 1, createdAt: -1 })
    .lean();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold">Projects</h1>
        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center gap-2 rounded-full bg-green px-4 py-2.5 text-sm font-medium text-[#04140b] hover:bg-green-bright transition-colors"
        >
          <Plus size={16} /> New project
        </Link>
      </div>

      {projects.length === 0 ? (
        <p className="mt-10 text-text-muted">No projects yet.</p>
      ) : (
        <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-surface">
          {projects.map((project) => (
            <div
              key={String(project._id)}
              className="flex items-center justify-between gap-4 px-6 py-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {project.featured && (
                    <Star
                      size={13}
                      className="text-green-bright shrink-0"
                      fill="currentColor"
                    />
                  )}
                  <p className="font-medium truncate">{project.title}</p>
                </div>
                <p className="mt-1 font-mono text-xs text-text-muted">
                  {project.category} · /{project.slug}
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <Link
                  href={`/dashboard/projects/${project._id}/edit`}
                  aria-label={`Edit ${project.title}`}
                  className="text-text-muted hover:text-green-bright transition-colors"
                >
                  <Pencil size={16} />
                </Link>
                <DeleteButton
                  endpoint={`/api/projects/${project._id}`}
                  itemName={project.title}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
