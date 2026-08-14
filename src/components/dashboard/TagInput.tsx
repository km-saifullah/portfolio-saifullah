"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";

export default function TagInput({
  value,
  onChange,
  label,
  placeholder = "Type and press Enter",
}: {
  value: string[];
  onChange: (tags: string[]) => void;
  label: string;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const tag = draft.trim();
    if (tag && !value.includes(tag)) onChange([...value, tag]);
    setDraft("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !draft && value.length > 0) {
      onChange(value.slice(0, -1));
    }
  };

  return (
    <div>
      <label className="font-mono text-xs text-text-muted">{label}</label>
      <div className="mt-2 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-bg px-3 py-2 focus-within:border-green-bright transition-colors">
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-full bg-green-dim px-2.5 py-1 font-mono text-xs text-green-bright"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(value.filter((t) => t !== tag))}
              aria-label={`Remove ${tag}`}
            >
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] bg-transparent py-1 text-sm outline-none"
        />
      </div>
    </div>
  );
}
