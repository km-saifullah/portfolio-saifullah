"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";
import { uploadImage } from "@/lib/uploadImage";

export default function ImageUploader({
  value,
  onChange,
  label = "Image",
}: {
  value: { url: string; publicId: string } | null;
  onChange: (val: { url: string; publicId: string } | null) => void;
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Image must be under 8MB.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const result = await uploadImage(file);
      onChange({ url: result.url, publicId: result.publicId });
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="font-mono text-xs text-text-muted">{label}</label>

      <div className="mt-2">
        {value?.url ? (
          <div className="relative h-40 w-64 rounded-lg overflow-hidden border border-border">
            <Image
              src={value.url}
              alt="Uploaded"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute top-2 right-2 rounded-full bg-bg/80 p-1.5 text-text-primary hover:text-red-400"
              aria-label="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={loading}
            className="flex h-40 w-64 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border text-text-muted hover:border-green-bright hover:text-green-bright transition-colors disabled:opacity-60"
          >
            {loading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <>
                <Upload size={20} />
                <span className="font-mono text-xs">Upload image</span>
              </>
            )}
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
      </div>

      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
