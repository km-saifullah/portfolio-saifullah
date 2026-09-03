"use client";

import { useEffect, useRef } from "react";

export default function BlogViewTracker({ slug }: { slug: string }) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;

    fetch(`/api/blogs/${encodeURIComponent(slug)}/view`, {
      method: "POST",
    }).catch(() => {});
  }, [slug]);

  return null;
}
