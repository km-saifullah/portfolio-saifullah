"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

const cards = [
  {
    number: "01 / 03",
    title: (
      <>
        Good software should feel{" "}
        <span className="text-green-bright">simple.</span>
      </>
    ),
    label: "I care about",
    value: "Quality · Clarity · Reliability",
    badge: "Let's build",
  },
  {
    number: "02 / 03",
    title: (
      <>
        Ideas become useful when they{" "}
        <span className="text-green-bright">work.</span>
      </>
    ),
    label: "My approach",
    value: "Understand · Build · Improve",
    badge: "Make it real",
  },
  {
    number: "03 / 03",
    title: (
      <>
        Details turn good products into{" "}
        <span className="text-green-bright">great ones.</span>
      </>
    ),
    label: "What matters",
    value: "People · Performance · Craft",
    badge: "Keep improving",
  },
];

const SOCIAL_LINKS = [
  {
    href: "https://github.com/km-saifullah",
    label: "GitHub",
    icon: GithubIcon,
  },
  {
    href: "https://www.linkedin.com/in/kmsaifullah/",
    label: "LinkedIn",
    icon: LinkedinIcon,
  },
];

export default function Hero() {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveCard((current) => (current + 1) % cards.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const card = cards[activeCard];

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-bg"
    >
      {/* Subtle editorial background detail */}
      <div className="pointer-events-none absolute -right-32 top-1/2 hidden h-136 w-136 -translate-y-1/2 rounded-full border border-border opacity-60 lg:block" />

      <div className="pointer-events-none absolute -right-8 top-1/2 hidden h-88 w-88 -translate-y-1/2 rounded-full border border-green-bright/20 lg:block" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-28 lg:grid-cols-[1fr_0.48fr] lg:gap-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-green-bright/40 font-mono text-xs text-green-bright">
              K
            </span>

            <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-faint">
              Software Engineer · Dhaka
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.05 }}
            className="font-display text-[4rem] font-semibold leading-[0.94] tracking-[-0.06em] sm:text-7xl md:text-8xl lg:text-[7.3rem]"
          >
            Building
            <span className="block text-text-muted">
              with purpose<span className="text-green-bright">.</span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-9 max-w-xl"
          >
            <p className="text-lg leading-8 text-text-muted">
              I&apos;m <span className="text-text">Khaled Md Saifullah</span>, a
              backend and full-stack developer who enjoys turning complex ideas
              into simple, reliable products.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="mt-9 flex flex-wrap items-center gap-5"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 border-b border-green-bright pb-1 text-sm font-medium text-green-bright transition-all hover:gap-3"
            >
              Explore my work
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <a
              href="#contact"
              className="text-sm font-medium text-text-muted transition-colors hover:text-text"
            >
              Start a conversation
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.36 }}
            className="mt-7 flex items-center gap-3"
          >
            <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">
              Find me
            </span>

            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-muted transition-all hover:border-green-bright hover:bg-green-dim hover:text-green-bright"
              >
                <Icon size={17} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Three-card automatic carousel */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.22 }}
          className="relative lg:justify-self-end"
        >
          <div className="relative w-full max-w-88">
            {/* Background cards */}
            <div className="absolute inset-x-4 top-3 h-full rounded-4xl border border-border bg-surface/50" />

            <div className="absolute inset-x-2 top-1 h-full rounded-4xl border border-border bg-surface/80" />

            <div className="relative overflow-hidden rounded-4xl border border-border bg-surface p-7 shadow-2xl shadow-black/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCard}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <div className="mb-16 flex items-start justify-between">
                    <span className="font-mono text-xs text-text-faint">
                      {card.number}
                    </span>

                    <span className="h-2 w-2 rounded-full bg-green-bright" />
                  </div>

                  <p className="min-h-28 font-display text-3xl font-medium leading-tight tracking-[-0.03em]">
                    {card.title}
                  </p>

                  <div className="mt-12 border-t border-border pt-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">
                      {card.label}
                    </p>

                    <p className="mt-2 text-sm text-text-muted">{card.value}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute -bottom-5 -left-5 rounded-full bg-green px-5 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#04140b]">
              {card.badge}
            </div>

            {/* Carousel indicators */}
            <div className="mt-7 flex items-center justify-center gap-2">
              {cards.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show card ${index + 1}`}
                  onClick={() => setActiveCard(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === activeCard
                      ? "w-7 bg-green-bright"
                      : "w-1.5 bg-border-strong hover:bg-text-faint"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#skills"
        aria-label="Scroll to skills section"
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint transition-colors hover:text-green-bright"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        Scroll
        <ArrowDown size={15} />
      </motion.a>
    </section>
  );
}
