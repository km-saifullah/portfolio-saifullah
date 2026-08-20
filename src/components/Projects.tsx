"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Projects
            </h2>

            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActive(cat.key)}
                  className={`rounded-full border px-4 py-2 font-mono text-xs transition-colors ${
                    active === cat.key
                      ? "border-green-bright bg-green-dim text-green-bright"
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
                  className="group relative overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-border-strong"
                >
                  {/* Clickable project preview */}
                  <Link
                    href={`/projects/${project.slug}`}
                    aria-label={`View ${project.title} project`}
                    className="block"
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

                        <div className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent" />
                      </div>
                    ) : (
                      <div className="flex h-44 w-full items-center justify-center bg-green-dim/40 font-mono text-xs text-text-faint">
                        no preview
                      </div>
                    )}

                    <div className="p-6 pb-3">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-green-bright">
                        {project.category}
                      </span>

                      <div className="mt-2 flex items-start justify-between gap-3">
                        <h3 className="font-display text-lg font-medium transition-colors group-hover:text-green-bright">
                          {project.title}
                        </h3>

                        <ArrowUpRight
                          size={17}
                          className="mt-1 shrink-0 text-text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-green-bright"
                        />
                      </div>

                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-muted">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-border px-2 py-1 font-mono text-[10px] text-text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>

                  {/* External project links */}
                  <div className="flex items-center gap-4 px-6 pb-6 pt-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} source code`}
                        className="text-text-muted transition-colors hover:text-green-bright"
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
                        className="text-text-muted transition-colors hover:text-green-bright"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}

                    <Link
                      href={`/projects/${project.slug}`}
                      className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-text-faint transition-colors hover:text-green-bright"
                    >
                      View project
                      <ArrowUpRight size={13} />
                    </Link>
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
