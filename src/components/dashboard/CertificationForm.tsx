"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import ImageUploader from "./ImageUploader";
import TagInput from "./TagInput";
import type { ICertification } from "@/models/Certification";

const DESCRIPTION_MAX = 300;

export default function CertificationForm({
  certification,
}: {
  certification?: ICertification;
}) {
  const router = useRouter();
  const isEdit = Boolean(certification);

  const [title, setTitle] = useState(certification?.title ?? "");
  const [description, setDescription] = useState(
    certification?.description ?? "",
  );
  const [image, setImage] = useState<{ url: string; publicId: string } | null>(
    certification?.imageUrl
      ? {
          url: certification.imageUrl,
          publicId: certification.imagePublicId ?? "",
        }
      : null,
  );
  const [topics, setTopics] = useState<string[]>(certification?.topics ?? []);
  const [technologies, setTechnologies] = useState<string[]>(
    certification?.technologies ?? [],
  );
  const [featured, setFeatured] = useState(certification?.featured ?? false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!image?.url) {
      setError("Please upload the certificate image.");
      return;
    }

    setSaving(true);

    const payload = {
      title,
      description,
      imageUrl: image.url,
      imagePublicId: image.publicId,
      topics,
      technologies,
      featured,
    };

    try {
      const res = await fetch(
        isEdit
          ? `/api/certifications/${certification!._id}`
          : "/api/certifications",
        {
          method: isEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Failed to save certification");

      router.push("/dashboard/certifications");
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
          Certificate name
        </label>
        <input
          id="title"
          required
          maxLength={150}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-green-bright"
          placeholder="e.g. AWS Certified Cloud Practitioner"
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
          rows={3}
          maxLength={DESCRIPTION_MAX}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 w-full resize-none rounded-lg border border-border bg-surface px-4 py-3 text-sm outline-none focus:border-green-bright"
          placeholder="One or two sentences about what this certification proves."
        />
        <p className="mt-1.5 text-right font-mono text-[11px] text-text-faint">
          {description.length}/{DESCRIPTION_MAX}
        </p>
      </div>

      <ImageUploader
        label="Certificate image"
        value={image}
        onChange={setImage}
      />

      <TagInput
        label="Topics covered"
        value={topics}
        onChange={setTopics}
        placeholder="e.g. IAM and access policies, press Enter"
      />

      <TagInput
        label="Technologies learned"
        value={technologies}
        onChange={setTechnologies}
        placeholder="e.g. AWS, press Enter"
      />

      <label className="flex items-center gap-2.5 font-mono text-xs text-text-muted">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
          className="h-4 w-4 accent-green-bright"
        />
        Feature this certification (shown first on the homepage)
      </label>

      {error && <p className="text-sm text-red-400">{error}</p>}

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
        {isEdit ? "Save changes" : "Add certification"}
      </button>
    </form>
  );
}
