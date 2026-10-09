"use client";

import { useEffect, useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Star, X } from "lucide-react";
import type { ICertification } from "@/models/Certification";

const subscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export default function CertificationModal({
  certification,
  onClose,
}: {
  certification: ICertification | null;
  onClose: () => void;
}) {
  const isClient = useIsClient();

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {certification && (
        <ModalContent
          key={certification._id}
          certification={certification}
          onClose={onClose}
        />
      )}
    </AnimatePresence>,
    document.body,
  );
}

function ModalContent({
  certification,
  onClose,
}: {
  certification: ICertification;
  onClose: () => void;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }

      if (e.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        );

        if (!focusable || focusable.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previouslyFocused?.focus?.();
    };
  }, []);

  const { title, description, imageUrl, topics, technologies, featured } =
    certification;

  return (
    <motion.div
      className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative grid max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-border-strong bg-surface shadow-2xl md:grid-cols-[1.15fr_1fr]"
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 rounded-full bg-bg/80 p-2 text-text-muted backdrop-blur-sm transition-colors hover:text-green-bright"
        >
          <X size={18} />
        </button>

        <div className="relative min-h-64 bg-bg-alt md:min-h-104">
          <Image
            src={imageUrl}
            alt={`${title} certificate`}
            fill
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-contain p-4"
          />
        </div>

        <div className="flex flex-col gap-6 p-6 md:p-8">
          <div>
            {featured && (
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-green-bright/30 bg-green-dim px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-green-bright">
                <Star size={11} fill="currentColor" />
                Featured
              </span>
            )}

            <h3
              id={titleId}
              className="font-display text-2xl font-semibold leading-tight md:pr-10"
            >
              {title}
            </h3>

            <p
              id={descriptionId}
              className="mt-3 text-sm leading-relaxed text-text-muted"
            >
              {description}
            </p>
          </div>

          {topics.length > 0 && (
            <section>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.15em] text-green-bright">
                Topics covered
              </h4>
              <ul className="mt-3 space-y-2">
                {topics.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-start gap-2.5 text-sm text-text-muted"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-green-bright" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {technologies.length > 0 && (
            <section>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.15em] text-green-bright">
                Technologies learned
              </h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border px-3 py-1 font-mono text-xs text-text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
