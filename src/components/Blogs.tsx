import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { format } from "date-fns";
import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";
import type { IBlog } from "@/models/Blog";

export default function Blogs({ blogs }: { blogs: IBlog[] }) {
  return (
    <section id="blogs" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Eyebrow>Writing</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
            Blogs
          </h2>
        </Reveal>

        {blogs.length === 0 ? (
          <p className="mt-16 text-text-muted">
            No posts published yet, the first one is on its way.
          </p>
        ) : (
          <div className="mt-14 grid gap-4">
            {blogs.map((blog, i) => (
              <Reveal key={blog._id} delay={i * 0.05}>
                <Link
                  href={`/blogs/${blog.slug}`}
                  className="group flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-6 hover:border-border-strong transition-colors"
                >
                  <div>
                    <p className="font-mono text-xs text-text-faint mb-1">
                      {format(new Date(blog.createdAt), "MMM d, yyyy")}
                    </p>
                    <h3 className="font-display text-xl font-medium group-hover:text-green-bright transition-colors">
                      {blog.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-muted max-w-2xl line-clamp-2">
                      {blog.excerpt}
                    </p>
                    {blog.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {blog.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] rounded border border-border px-2 py-1 text-text-muted"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <ArrowUpRight
                    className="shrink-0 text-text-faint group-hover:text-green-bright group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                    size={22}
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
