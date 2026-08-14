"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import ImageUploader from "./ImageUploader";
import TagInput from "./TagInput";
import type { IProject, ProjectCategory } from "@/models/Project";

const CATEGORIES: ProjectCategory[] = [
  "backend",
  "full-stack",
  "devops",
  "other",
];

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function ProjectForm({ project }: { project?: IProject }) {
  const router = useRouter();
  const isEdit = Boolean(project);

  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [description, setDescription] = useState(project?.description ?? "");
  const [content, setContent] = useState(project?.content ?? "");
  const [category, setCategory] = useState<ProjectCategory>(
    project?.category ?? "backend",
  );
  const [techStack, setTechStack] = useState<string[]>(
    project?.techStack ?? [],
  );
  const [image, setImage] = useState<{ url: string; publicId: string } | null>(
    project?.imageUrl
      ? { url: project.imageUrl, publicId: project.imagePublicId ?? "" }
      : null,
  );
  const [githubUrl, setGithubUrl] = useState(project?.githubUrl ?? "");
  const [liveUrl, setLiveUrl] = useState(project?.liveUrl ?? "");
  const [featured, setFeatured] = useState(project?.featured ?? false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title,
      slug,
      description,
      content,
      category,
      techStack,
      imageUrl: image?.url ?? "",
      imagePublicId: image?.publicId ?? "",
      githubUrl,
      liveUrl,
      featured,
      order: project?.order ?? 0,
    };

    try {
      const res = await fetch(
        isEdit ? `/api/projects/${project!._id}` : "/api/projects",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save project");

      router.push("/dashboard/projects");
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
        <label
          htmlFor="description"
          className="font-mono text-xs text-text-muted"
        >
          Short description
        </label>
        <textarea
          id="description"
          required
          rows={2}
          maxLength={500}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-green-bright resize-none"
        />
      </div>

      <div>
        <label htmlFor="content" className="font-mono text-xs text-text-muted">
          Full write-up <span className="text-text-faint">(optional)</span>
        </label>
        <textarea
          id="content"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-green-bright resize-none"
        />
      </div>

      <div>
        <label className="font-mono text-xs text-text-muted">Category</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`font-mono text-xs rounded-full border px-4 py-2 transition-colors ${
                category === cat
                  ? "border-green-bright text-green-bright bg-green-dim"
                  : "border-border text-text-muted hover:border-border-strong"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <TagInput
        label="Tech stack"
        value={techStack}
        onChange={setTechStack}
        placeholder="e.g. Node.js, press Enter"
      />

      <ImageUploader label="Project image" value={image} onChange={setImage} />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="githubUrl"
            className="font-mono text-xs text-text-muted"
          >
            GitHub URL <span className="text-text-faint">(optional)</span>
          </label>
          <input
            id="githubUrl"
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-green-bright"
            placeholder="https://github.com/..."
          />
        </div>
        <div>
          <label
            htmlFor="liveUrl"
            className="font-mono text-xs text-text-muted"
          >
            Live URL <span className="text-text-faint">(optional)</span>
          </label>
          <input
            id="liveUrl"
            type="url"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-green-bright"
            placeholder="https://..."
          />
        </div>
      </div>

      <label className="flex items-center gap-2.5 font-mono text-xs text-text-muted">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="h-4 w-4 accent-green-bright"
        />
        Feature this project
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
        {isEdit ? "Save changes" : "Create project"}
      </button>
    </form>
  );
}
