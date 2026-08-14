import Link from "next/link";
import { Plus, Pencil, EyeOff } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import DeleteButton from "@/components/dashboard/DeleteButton";

export const dynamic = "force-dynamic";

export default async function BlogsListPage() {
  await connectDB();
  const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold">Blogs</h1>
        <Link
          href="/dashboard/blogs/new"
          className="inline-flex items-center gap-2 rounded-full bg-green px-4 py-2.5 text-sm font-medium text-[#04140b] hover:bg-green-bright transition-colors"
        >
          <Plus size={16} /> New post
        </Link>
      </div>

      {blogs.length === 0 ? (
        <p className="mt-10 text-text-muted">No posts yet.</p>
      ) : (
        <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-surface">
          {blogs.map((blog) => (
            <div
              key={String(blog._id)}
              className="flex items-center justify-between gap-4 px-6 py-4"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  {!blog.published && (
                    <EyeOff size={13} className="text-text-faint shrink-0" />
                  )}
                  <p className="font-medium truncate">{blog.title}</p>
                </div>
                <p className="mt-1 font-mono text-xs text-text-muted">
                  /{blog.slug}
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <Link
                  href={`/dashboard/blogs/${blog._id}/edit`}
                  aria-label={`Edit ${blog.title}`}
                  className="text-text-muted hover:text-green-bright transition-colors"
                >
                  <Pencil size={16} />
                </Link>
                <DeleteButton
                  endpoint={`/api/blogs/${blog._id}`}
                  itemName={blog.title}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
