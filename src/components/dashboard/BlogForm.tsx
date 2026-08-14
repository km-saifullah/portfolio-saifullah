"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import ImageUploader from "./ImageUploader";
import TagInput from "./TagInput";
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
  const [cover, setCover] = useState<{ url: string; publicId: string } | null>(
    blog?.coverImageUrl
      ? { url: blog.coverImageUrl, publicId: blog.coverImagePublicId ?? "" }
      : null,
  );
  const [published, setPublished] = useState(blog?.published ?? true);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save post");

      router.push("/dashboard/blogs");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-6">
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
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-green-bright"
        />
      </div>

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

      <div>
        <label htmlFor="excerpt" className="font-mono text-xs text-text-muted">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          required
          rows={2}
          maxLength={300}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-green-bright resize-none"
        />
      </div>

      <div>
        <label htmlFor="content" className="font-mono text-xs text-text-muted">
          Content
        </label>
        <textarea
          id="content"
          required
          rows={12}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-green-bright resize-none"
          placeholder="Plain text or Markdown rendered as-is on the post page."
        />
      </div>

      <TagInput
        label="Tags"
        value={tags}
        onChange={setTags}
        placeholder="e.g. nextjs, press Enter"
      />

      <ImageUploader label="Cover image" value={cover} onChange={setCover} />

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

      <button
        type="submit"
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-full bg-green px-6 py-3 font-medium text-[#04140b] hover:bg-green-bright transition-colors disabled:opacity-60"
      >
        {saving ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Save size={16} />
        )}
        {isEdit ? "Save changes" : "Publish post"}
      </button>
    </form>
  );
}
