import Link from "next/link";
import Image from "next/image";
import {
  FolderKanban,
  Newspaper,
  Award,
  Mail,
  Plus,
  Eye,
  Star,
} from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import Blog from "@/models/Blog";
import Message from "@/models/Message";
import { getCertificationStats } from "@/lib/certificationStats";

export const dynamic = "force-dynamic";

export default async function DashboardOverview() {
  await connectDB();
  const [
    projectCount,
    blogCount,
    messageCount,
    unreadMessageCount,
    blogs,
    certStats,
  ] = await Promise.all([
    Project.countDocuments(),
    Blog.countDocuments(),
    Message.countDocuments(),
    Message.countDocuments({ read: false }),
    Blog.find({})
      .sort({ readCount: -1, createdAt: -1 })
      .select("title slug readCount")
      .lean(),
    getCertificationStats(),
  ]);

  const totalReads = blogs.reduce((sum, b) => sum + (b.readCount ?? 0), 0);

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold">Overview</h1>
      <p className="mt-2 text-text-muted">
        Manage your projects, blog posts, certifications, and messages.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 max-w-5xl">
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

        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="flex items-center justify-between">
            <Award className="text-green-bright" size={22} />
            <span className="font-display text-3xl font-semibold">
              {certStats.total}
            </span>
          </div>
          <p className="mt-3 font-mono text-xs text-text-muted uppercase tracking-wide">
            Certifications
            {certStats.featured > 0 ? ` · ${certStats.featured} featured` : ""}
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              href="/dashboard/certifications"
              className="text-sm text-text-muted hover:text-green-bright transition-colors"
            >
              Manage
            </Link>
            <Link
              href="/dashboard/certifications/new"
              className="flex items-center gap-1 text-sm text-green-bright hover:text-green transition-colors"
            >
              <Plus size={14} /> New
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="flex items-center justify-between">
            <Mail className="text-green-bright" size={22} />
            <span className="font-display text-3xl font-semibold">
              {messageCount}
            </span>
          </div>
          <p className="mt-3 font-mono text-xs text-text-muted uppercase tracking-wide">
            Messages
            {unreadMessageCount > 0 ? ` · ${unreadMessageCount} new` : ""}
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              href="/dashboard/messages"
              className="text-sm text-text-muted hover:text-green-bright transition-colors"
            >
              View inbox
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-2xl">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Blog reads</h2>
          <span className="font-mono text-xs text-text-muted">
            {totalReads} unique {totalReads === 1 ? "read" : "reads"} total
          </span>
        </div>

        {blogs.length === 0 ? (
          <p className="mt-4 text-sm text-text-muted">
            No blog posts yet, reads will show up here once you publish one.
          </p>
        ) : (
          <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-surface">
            {blogs.map((blog) => (
              <div
                key={String(blog._id)}
                className="flex items-center justify-between gap-4 px-6 py-4"
              >
                <p className="truncate font-medium">{blog.title}</p>
                <span className="flex shrink-0 items-center gap-1.5 font-mono text-sm text-text-muted">
                  <Eye size={14} className="text-green-bright" />
                  {blog.readCount ?? 0}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-12 max-w-2xl">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Certifications</h2>
          <span className="font-mono text-xs text-text-muted">
            {certStats.featured} featured · {certStats.totalTopics}{" "}
            {certStats.totalTopics === 1 ? "topic" : "topics"} covered
          </span>
        </div>

        {certStats.total === 0 ? (
          <p className="mt-4 text-sm text-text-muted">
            No certifications yet,{" "}
            <Link
              href="/dashboard/certifications/new"
              className="text-green-bright hover:underline"
            >
              add your first one
            </Link>
            .
          </p>
        ) : (
          <>
            <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-surface">
              {certStats.recent.map((cert) => (
                <div
                  key={cert._id}
                  className="flex items-center justify-between gap-4 px-6 py-4"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md border border-border bg-bg-alt">
                      <Image
                        src={cert.imageUrl}
                        alt={cert.title}
                        fill
                        sizes="56px"
                        className="object-contain"
                      />
                    </div>
                    <div className="flex min-w-0 items-center gap-2">
                      {cert.featured && (
                        <Star
                          size={13}
                          className="shrink-0 text-green-bright"
                          fill="currentColor"
                        />
                      )}
                      <p className="truncate font-medium">{cert.title}</p>
                    </div>
                  </div>
                  <span className="shrink-0 font-mono text-xs text-text-muted">
                    {cert.topicsCount} topics · {cert.technologiesCount} tech
                  </span>
                </div>
              ))}
            </div>

            {certStats.total > certStats.recent.length && (
              <Link
                href="/dashboard/certifications"
                className="mt-3 inline-block text-sm text-text-muted hover:text-green-bright transition-colors"
              >
                View all {certStats.total} certifications
              </Link>
            )}

            {certStats.technologies.length > 0 && (
              <div className="mt-6">
                <h3 className="font-mono text-xs uppercase tracking-wide text-text-muted">
                  Top technologies
                </h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {certStats.technologies.map((tech) => (
                    <li
                      key={tech.name}
                      className="rounded-full border border-border px-3 py-1 font-mono text-xs text-text-muted"
                    >
                      {tech.name}
                      <span className="ml-1.5 text-text-faint">
                        ×{tech.count}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
