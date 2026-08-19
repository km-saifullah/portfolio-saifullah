import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";

const skillGroups = [
  {
    title: "Backend",
    description:
      "Building APIs and application logic with a focus on clarity and reliability.",
    skills: ["JavaScript", "Node.js", "Express", "Next.js", "Go"],
  },
  {
    title: "Frontend",
    description:
      "Creating practical interfaces that stay fast, responsive, and easy to use.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "SCSS",
      "HTML",
      "CSS",
    ],
  },
  {
    title: "Cloud & DevOps",
    description:
      "Working across deployment, automation, containers, and production infrastructure.",
    skills: [
      "Linux",
      "Bash",
      "AWS",
      "Docker",
      "CI/CD",
      "Jenkins",
      "VPS Server",
    ],
  },
  {
    title: "Databases",
    description:
      "Designing and working with application data across relational and document databases.",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Eyebrow>What I work with</Eyebrow>

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Skills &amp; tools
            </h2>

            <p className="max-w-xl text-sm leading-7 text-text-muted md:text-right">
              A practical toolkit built around backend development, full-stack
              products, databases, and the infrastructure needed to run them.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 0.06}>
              <article className="group h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">
                    0{index + 1}
                  </span>

                  <span className="h-2 w-2 rounded-full bg-green-bright transition-transform group-hover:scale-125" />
                </div>

                <h3 className="mt-8 font-display text-xl font-medium">
                  {group.title}
                </h3>

                <p className="mt-3 min-h-22 text-sm leading-6 text-text-muted">
                  {group.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border px-3 py-1.5 font-mono text-[10px] text-text-muted transition-colors group-hover:border-border-strong group-hover:text-text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
