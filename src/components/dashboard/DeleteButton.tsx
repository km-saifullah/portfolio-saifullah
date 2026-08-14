"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";

export default function DeleteButton({
  endpoint,
  itemName,
}: {
  endpoint: string;
  itemName: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        aria-label={`Delete ${itemName}`}
        className="text-text-muted hover:text-red-400 transition-colors"
      >
        <Trash2 size={16} />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 font-mono text-xs">
      <span className="text-text-muted">Delete?</span>
      <button
        type="button"
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          const res = await fetch(endpoint, { method: "DELETE" });
          if (res.ok) {
            router.refresh();
          } else {
            setLoading(false);
            setConfirming(false);
          }
        }}
        className="text-red-400 hover:text-red-300"
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : "Yes"}
      </button>
      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="text-text-muted hover:text-text-primary"
      >
        No
      </button>
    </div>
  );
}
