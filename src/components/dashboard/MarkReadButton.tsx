"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Mail, MailOpen } from "lucide-react";

export default function MarkReadButton({
  id,
  read,
}: {
  id: string;
  read: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    setLoading(true);
    const res = await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !read }),
    });
    setLoading(false);
    if (res.ok) router.refresh();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={loading}
      aria-label={read ? "Mark as unread" : "Mark as read"}
      className="text-text-muted hover:text-green-bright transition-colors disabled:opacity-60"
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : read ? (
        <MailOpen size={16} />
      ) : (
        <Mail size={16} />
      )}
    </button>
  );
}
