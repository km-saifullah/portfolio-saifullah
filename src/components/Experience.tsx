import { experience } from "@/data/experience";
import Reveal from "./Reveal";
import Eyebrow from "./Eyebrow";

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Eyebrow>Career log</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
            Experience
          </h2>
        </Reveal>

        <div className="mt-16 relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-green-bright/60 via-border-strong to-transparent" />

          <ol className="space-y-14">
            {experience.map((item, i) => (
              <Reveal key={item.role + item.company} delay={i * 0.08}>
                <li className="relative pl-10">
                  <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-green-bright bg-bg" />

                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-faint mb-2">
                    {item.period}
                  </p>
                  <h3 className="font-display text-xl md:text-2xl font-medium">
                    {item.role}{" "}
                    <span className="text-green-bright">@ {item.company}</span>
                  </h3>
                  <p className="mt-3 max-w-2xl text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs rounded-full border border-border px-3 py-1 text-text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
