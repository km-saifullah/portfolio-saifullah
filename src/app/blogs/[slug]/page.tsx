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

      <main className="flex-1 pt-28 pb-20">
        <article className="mx-auto max-w-3xl px-6">
          {/* Back */}
          <Link
            href="/#blogs"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted transition-colors hover:text-green-bright"
          >
            <ArrowLeft size={14} />
            Back to blogs
          </Link>

          {/* Date */}
          <p className="mt-7 font-mono text-xs text-text-faint">
            {format(new Date(blog.createdAt), "MMMM d, yyyy")}
          </p>

          {/* Title */}
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold leading-[1.15] tracking-tight md:text-4xl lg:text-[2.75rem]">
            {blog.title}
          </h1>

          {/* Tags */}
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

          {/* Cover */}
          {blog.coverImageUrl && (
            <div className="relative mt-8 h-56 w-full overflow-hidden rounded-2xl border border-border sm:h-72 md:h-[380px]">
              <Image
                src={blog.coverImageUrl}
                alt={blog.title}
                fill
                sizes="(max-width: 640px) calc(100vw - 3rem), (max-width: 1024px) 768px, 900px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article content */}
          <div
            className="
              mt-9
              text-[15px]
              leading-7
              text-text-primary/90

              [&_p]:my-4
              [&_p]:leading-7

              [&_h1]:mb-4
              [&_h1]:mt-10
              [&_h1]:font-display
              [&_h1]:text-3xl
              [&_h1]:font-semibold
              [&_h1]:leading-tight
              [&_h1]:tracking-tight

              [&_h2]:mb-3
              [&_h2]:mt-9
              [&_h2]:font-display
              [&_h2]:text-2xl
              [&_h2]:font-semibold
              [&_h2]:leading-tight
              [&_h2]:tracking-tight

              [&_h3]:mb-2
              [&_h3]:mt-7
              [&_h3]:font-display
              [&_h3]:text-xl
              [&_h3]:font-semibold
              [&_h3]:leading-tight

              [&_h4]:mb-2
              [&_h4]:mt-6
              [&_h4]:font-display
              [&_h4]:text-lg
              [&_h4]:font-semibold

              [&_strong]:font-semibold
              [&_b]:font-semibold
              [&_em]:italic
              [&_i]:italic
              [&_u]:underline
              [&_u]:underline-offset-2

              [&_ul]:my-5
              [&_ul]:list-disc
              [&_ul]:pl-6

              [&_ol]:my-5
              [&_ol]:list-decimal
              [&_ol]:pl-6

              [&_li]:my-1.5

              [&_blockquote]:my-7
              [&_blockquote]:border-l-2
              [&_blockquote]:border-green-bright
              [&_blockquote]:pl-5
              [&_blockquote]:italic
              [&_blockquote]:text-text-muted

              [&_a]:text-green-bright
              [&_a]:underline
              [&_a]:underline-offset-2
              [&_a]:decoration-green-bright/50
              [&_a]:transition-colors
              [&_a]:hover:decoration-green-bright

              [&_img]:my-7
              [&_img]:block
              [&_img]:h-auto
              [&_img]:max-w-full
              [&_img]:rounded-xl
              [&_img]:border
              [&_img]:border-border

              [&_hr]:my-9
              [&_hr]:border-border

              [&_font[size='2']]:text-sm
              [&_font[size='3']]:text-base
              [&_font[size='5']]:text-xl
              [&_font[size='6']]:text-2xl

              [&_br]:leading-7
            "
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
