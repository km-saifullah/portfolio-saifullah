"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";
import { GithubIcon } from "./Icons";
import type { IProject, ProjectCategory } from "@/models/Project";

const CATEGORIES: { key: ProjectCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "backend", label: "Backend" },
  { key: "full-stack", label: "Full-Stack" },
  { key: "devops", label: "DevOps" },
  { key: "other", label: "Other" },
];

export default function Projects({ projects }: { projects: IProject[] }) {
  const [active, setActive] = useState<ProjectCategory | "all">("all");

  const filtered = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((p) => p.category === active),
    [active, projects],
  );

  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Eyebrow>Selected work</Eyebrow>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
              Projects
            </h2>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActive(cat.key)}
                  className={`font-mono text-xs rounded-full border px-4 py-2 transition-colors ${
                    active === cat.key
                      ? "border-green-bright text-green-bright bg-green-dim"
                      : "border-border text-text-muted hover:border-border-strong hover:text-text-primary"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {filtered.length === 0 ? (
          <p className="mt-16 text-text-muted">
            No projects in this category yet, check back soon.
          </p>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.article
                  key={project._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="group relative rounded-2xl border border-border bg-surface overflow-hidden hover:border-border-strong transition-colors"
                >
                  {project.imageUrl ? (
                    <div className="relative h-44 w-full overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div className="h-44 w-full bg-green-dim/40 flex items-center justify-center font-mono text-xs text-text-faint">
                      no preview
                    </div>
                  )}

                  <div className="p-6">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-green-bright">
                      {project.category}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-medium">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-muted leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[10px] rounded border border-border px-2 py-1 text-text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center gap-4">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} source code`}
                          className="text-text-muted hover:text-green-bright transition-colors"
                        >
                          <GithubIcon size={18} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} live site`}
                          className="text-text-muted hover:text-green-bright transition-colors"
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
