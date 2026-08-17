"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Eye, X } from "lucide-react";
import ImageUploader from "./ImageUploader";
import TagInput from "./TagInput";
import RichTextEditor from "./RichTextEditor";
import type { IBlog } from "@/models/Blog";

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function BlogForm({ blog }: { blog?: IBlog }) {
  const router = useRouter();
  const isEdit = Boolean(blog);

  const [title, setTitle] = useState(blog?.title ?? "");

  const [slug, setSlug] = useState(blog?.slug ?? "");

  const [slugTouched, setSlugTouched] = useState(isEdit);

  const [excerpt, setExcerpt] = useState(blog?.excerpt ?? "");

  const [content, setContent] = useState(blog?.content ?? "");

  const [tags, setTags] = useState<string[]>(blog?.tags ?? []);

  const [cover, setCover] = useState<{
    url: string;
    publicId: string;
  } | null>(
    blog?.coverImageUrl
      ? {
          url: blog.coverImageUrl,
          publicId: blog.coverImagePublicId ?? "",
        }
      : null,
  );

  const [published, setPublished] = useState(blog?.published ?? true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [showPreview, setShowPreview] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    const payload = {
      title,
      slug,
      excerpt,
      content,
      tags,
      coverImageUrl: cover?.url ?? "",
      coverImagePublicId: cover?.publicId ?? "",
      published,
    };

    try {
      const res = await fetch(
        isEdit ? `/api/blogs/${blog!._id}` : "/api/blogs",
        {
          method: isEdit ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save post");
      }

      router.push("/dashboard/blogs");

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");

      setSaving(false);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="max-w-3xl space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="font-mono text-xs text-text-muted">
            Title
          </label>

          <input
            id="title"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);

              if (!slugTouched) {
                setSlug(slugify(e.target.value));
              }
            }}
            className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-green-bright"
          />
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="font-mono text-xs text-text-muted">
            Slug
          </label>

          <input
            id="slug"
            required
            value={slug}
            onChange={(e) => {
              setSlug(slugify(e.target.value));

              setSlugTouched(true);
            }}
            className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm font-mono outline-none focus:border-green-bright"
          />
        </div>

        {/* Excerpt */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="excerpt"
              className="font-mono text-xs text-text-muted"
            >
              Excerpt
            </label>

            <span className="font-mono text-[10px] text-text-faint">
              {excerpt.length}/300
            </span>
          </div>

          <textarea
            id="excerpt"
            required
            rows={3}
            maxLength={300}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="mt-2 w-full resize-none rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-green-bright"
          />
        </div>

        {/* Content */}
        <div>
          <div className="flex items-center justify-between">
            <label className="font-mono text-xs text-text-muted">Content</label>

            <span className="font-mono text-[10px] text-text-faint">
              Rich text editor
            </span>
          </div>

          <RichTextEditor value={content} onChange={setContent} />
        </div>

        {/* Tags */}
        <TagInput
          label="Tags"
          value={tags}
          onChange={setTags}
          placeholder="e.g. nextjs, press Enter"
        />

        {/* Cover */}
        <ImageUploader label="Cover image" value={cover} onChange={setCover} />

        {/* Published */}
        <label className="flex items-center gap-2.5 font-mono text-xs text-text-muted">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 accent-green-bright"
          />
          Published (visible on the public site)
        </label>

        {error && <p className="text-sm text-red-400">{error}</p>}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => setShowPreview(true)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-3 text-sm font-medium text-text transition-colors hover:border-green-bright hover:text-green-bright"
          >
            <Eye size={16} />
            Preview
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 font-medium text-[#04140b] transition-colors hover:bg-green-bright disabled:opacity-60"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Save size={16} />
            )}

            {isEdit ? "Save changes" : "Publish post"}
          </button>
        </div>
      </form>

      {/* Preview modal */}
      {showPreview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowPreview(false);
            }
          }}
        >
          <div className="flex h-full max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border bg-bg shadow-2xl">
            {/* Modal header */}
            <div className="flex shrink-0 items-center justify-between border-b border-border bg-surface px-5 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <Eye size={17} className="text-green-bright" />

                  <h2 className="font-display text-base font-semibold">
                    Blog preview
                  </h2>
                </div>

                <p className="mt-1 text-xs text-text-faint">
                  Previewing the current content. Nothing has been saved yet.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPreview(false)}
                aria-label="Close preview"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-bg hover:text-text"
              >
                <X size={18} />
              </button>
            </div>

            {/* Preview content */}
            <div className="min-h-0 flex-1 overflow-y-auto">
              <article className="mx-auto max-w-3xl px-6 py-10 md:px-10 md:py-14">
                {/* Date placeholder */}
                <p className="font-mono text-xs text-text-faint">
                  {blog?.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Preview"}
                </p>

                {/* Title */}
                <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-text md:text-4xl">
                  {title || "Your blog title"}
                </h1>

                {/* Tags */}
                {tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-border px-2 py-1 font-mono text-[10px] text-text-muted"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Cover image */}
                {cover?.url && (
                  <div className="mt-8 overflow-hidden rounded-2xl border border-border">
                    <img
                      src={cover.url}
                      alt={title || "Blog cover"}
                      className="block max-h-105 w-full object-cover"
                    />
                  </div>
                )}

                {/* Excerpt */}
                {excerpt && (
                  <p className="mt-8 border-l-2 border-green-bright pl-4 text-base leading-7 text-text-muted">
                    {excerpt}
                  </p>
                )}

                {/* Article */}
                <div
                  className="
                    mt-8
                    text-[15px]
                    leading-7
                    text-text-primary

                    [&_p]:my-4
                    [&_p]:leading-7

                    [&_h1]:mb-4
                    [&_h1]:mt-9
                    [&_h1]:text-3xl
                    [&_h1]:font-semibold
                    [&_h1]:leading-tight

                    [&_h2]:mb-3
                    [&_h2]:mt-8
                    [&_h2]:text-2xl
                    [&_h2]:font-semibold
                    [&_h2]:leading-tight

                    [&_h3]:mb-2
                    [&_h3]:mt-7
                    [&_h3]:text-xl
                    [&_h3]:font-semibold

                    [&_h4]:mb-2
                    [&_h4]:mt-6
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

                    [&_li]:my-1

                    [&_blockquote]:my-6
                    [&_blockquote]:border-l-2
                    [&_blockquote]:border-green-bright
                    [&_blockquote]:pl-5
                    [&_blockquote]:italic
                    [&_blockquote]:text-text-muted

                    [&_a]:text-green-bright
                    [&_a]:underline
                    [&_a]:underline-offset-2

                    [&_img]:my-7
                    [&_img]:block
                    [&_img]:h-auto
                    [&_img]:max-w-full
                    [&_img]:rounded-xl
                    [&_img]:border
                    [&_img]:border-border

                    [&_hr]:my-8
                    [&_hr]:border-border

                    [&_font[size='2']]:text-sm
                    [&_font[size='3']]:text-base
                    [&_font[size='5']]:text-xl
                    [&_font[size='6']]:text-2xl
                  "
                  dangerouslySetInnerHTML={{
                    __html: content || "<p>Start writing your article...</p>",
                  }}
                />
              </article>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
