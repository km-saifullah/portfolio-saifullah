import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { sanitizeBlogHtml } from "@/lib/sanitizeHtml";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getBlog(slug: string) {
  await connectDB();

  const blog = await Blog.findOne({
    slug,
    published: true,
  }).lean();

  if (!blog) return null;

  return {
    ...JSON.parse(JSON.stringify(blog)),
    content: sanitizeBlogHtml(blog.content),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) return {};

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  if (!blog) notFound();

  return (
    <>
      <Navbar />

      <main className="flex-1 pt-32 pb-24">
        <article className="mx-auto max-w-3xl px-6">
          <Link
            href="/#blogs"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted transition-colors hover:text-green-bright"
          >
            <ArrowLeft size={14} />
            Back to blogs
          </Link>

          <p className="mt-8 font-mono text-xs text-text-faint">
            {format(new Date(blog.createdAt), "MMMM d, yyyy")}
          </p>

          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            {blog.title}
          </h1>

          {blog.tags?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-1.5">
              {blog.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded border border-border px-2 py-1 font-mono text-[10px] text-text-muted"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {blog.coverImageUrl && (
            <div className="relative mt-10 h-64 w-full overflow-hidden rounded-2xl border border-border md:h-96">
              <Image
                src={blog.coverImageUrl}
                alt={blog.title}
                fill
                sizes="(max-width: 768px) calc(100vw - 3rem), 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div
            className="prose-content mt-10"
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          />
        </article>
      </main>

      <Footer />
    </>
  );
}
