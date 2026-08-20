import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GithubIcon } from "@/components/Icons";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
  await connectDB();

  const project = await Project.findOne({ slug }).lean();

  if (!project) return null;

  return JSON.parse(JSON.stringify(project));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const project = await getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      ...(project.imageUrl
        ? {
            images: [
              {
                url: project.imageUrl,
                alt: project.title,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { slug } = await params;

  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 pt-28 pb-24">
        <article className="mx-auto max-w-5xl px-6">
          {/* Back to projects */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted transition-colors hover:text-green-bright"
          >
            <ArrowLeft size={14} />
            Back to projects
          </Link>

          {/* Project header */}
          <div className="mt-10 max-w-4xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-green-bright">
              {project.category}
            </p>

            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-6xl">
              {project.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-text-muted md:text-lg">
              {project.description}
            </p>
          </div>

          {/* Project image */}
          {project.imageUrl && (
            <div className="relative mt-12 aspect-video w-full overflow-hidden rounded-2xl border border-border bg-surface">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          )}

          {/* Main content + sidebar */}
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_280px]">
            {/* Project write-up */}
            <div>
              <div className="mb-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">
                  About this project
                </p>

                <div className="mt-4 h-px w-full bg-border" />
              </div>

              {project.content ? (
                <div className="whitespace-pre-wrap text-[15px] leading-8 text-text-muted">
                  {project.content}
                </div>
              ) : (
                <p className="text-[15px] leading-8 text-text-muted">
                  {project.description}
                </p>
              )}
            </div>

            {/* Sidebar */}
            <aside className="h-fit rounded-2xl border border-border bg-surface p-6">
              {/* Tech stack */}
              {project.techStack?.length > 0 && (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">
                    Tech stack
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.map((tech: string) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border px-3 py-1.5 font-mono text-[10px] text-text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project links */}
              {(project.githubUrl || project.liveUrl) && (
                <div className="mt-7 border-t border-border pt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">
                    Project links
                  </p>

                  <div className="mt-4 flex flex-col gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between rounded-lg border border-border px-4 py-3 text-sm text-text-muted transition-colors hover:border-green-bright hover:text-green-bright"
                      >
                        <span className="inline-flex items-center gap-2">
                          <GithubIcon size={16} />
                          Source code
                        </span>

                        <ArrowUpRight size={15} />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between rounded-lg bg-green px-4 py-3 text-sm font-medium text-[#04140b] transition-colors hover:bg-green-bright"
                      >
                        <span className="inline-flex items-center gap-2">
                          <ExternalLink size={16} />
                          Live project
                        </span>

                        <ArrowUpRight size={15} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </aside>
          </div>

          {/* Bottom navigation */}
          <div className="mt-16 border-t border-border pt-8">
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-green-bright"
            >
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-1"
              />
              Back to all projects
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
