"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Star } from "lucide-react";
import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";
import CertificationModal from "./CertificationModal";
import type { ICertification } from "@/models/Certification";

const INITIAL_COUNT = 6;

const HOVER_OPEN_DELAY = 350;

const REOPEN_COOLDOWN = 700;

export default function Certifications({
  certifications,
}: {
  certifications: ICertification[];
}) {
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<ICertification | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastClosedAt = useRef(0);

  const sorted = useMemo(
    () =>
      [...certifications].sort(
        (a, b) => Number(b.featured) - Number(a.featured),
      ),
    [certifications],
  );

  const featuredCount = sorted.filter((c) => c.featured).length;
  const initialCount = Math.max(INITIAL_COUNT, featuredCount);
  const hasMore = sorted.length > initialCount;
  const visible = showAll ? sorted : sorted.slice(0, initialCount);

  const clearHoverTimer = useCallback(() => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  }, []);

  useEffect(() => clearHoverTimer, [clearHoverTimer]);

  const openNow = (cert: ICertification) => {
    clearHoverTimer();
    setSelected(cert);
  };

  const scheduleOpen = (cert: ICertification) => {
    clearHoverTimer();
    hoverTimer.current = setTimeout(() => {
      hoverTimer.current = null;
      if (Date.now() - lastClosedAt.current < REOPEN_COOLDOWN) return;
      setSelected(cert);
    }, HOVER_OPEN_DELAY);
  };

  const closeModal = useCallback(() => {
    lastClosedAt.current = Date.now();
    setSelected(null);
  }, []);

  const toggleShowAll = () => {
    if (showAll) {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setShowAll((v) => !v);
  };

  if (certifications.length === 0) return null;

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-28 md:py-36"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Eyebrow>Achievements</Eyebrow>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Certifications
            </h2>

            <p className="max-w-xs text-sm text-text-muted">
              Hover over or tap a certificate to see what it covered.
            </p>
          </div>
        </Reveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((cert, i) => (
            <motion.li
              key={cert._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
            >
              <button
                type="button"
                aria-haspopup="dialog"
                aria-label={`View details for ${cert.title}`}
                onClick={() => openNow(cert)}
                onMouseMove={() => scheduleOpen(cert)}
                onMouseLeave={clearHoverTimer}
                className="group relative block h-full w-full overflow-hidden rounded-2xl border border-border bg-surface text-left transition-colors hover:border-border-strong focus-visible:border-green-bright"
              >
                <span className="relative block aspect-16/10 w-full overflow-hidden bg-bg-alt">
                  <Image
                    src={cert.imageUrl}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  {cert.featured && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-bg/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-green-bright backdrop-blur-sm">
                      <Star size={10} fill="currentColor" />
                      Featured
                    </span>
                  )}
                </span>

                <span className="block p-6">
                  <span className="line-clamp-2 block font-display text-lg font-medium transition-colors group-hover:text-green-bright">
                    {cert.title}
                  </span>

                  <span className="mt-2 line-clamp-2 block text-sm leading-relaxed text-text-muted">
                    {cert.description}
                  </span>

                  <span className="mt-4 block font-mono text-[10px] uppercase tracking-wider text-text-faint transition-colors group-hover:text-green-bright">
                    View details
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </ul>

        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={toggleShowAll}
              aria-expanded={showAll}
              className="inline-flex items-center gap-2 rounded-full border border-border-strong px-6 py-3 font-mono text-sm text-text-primary transition-colors hover:border-green-bright hover:text-green-bright"
            >
              {showAll ? (
                <>
                  Show less
                  <ChevronUp size={16} />
                </>
              ) : (
                <>
                  See more
                  <span className="text-text-faint">
                    ({sorted.length - initialCount} more)
                  </span>
                  <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <CertificationModal certification={selected} onClose={closeModal} />
    </section>
  );
}
