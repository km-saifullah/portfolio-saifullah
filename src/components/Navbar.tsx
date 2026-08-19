"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#blogs", label: "Blogs" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-text-primary"
        >
          <span className="text-green-bright">/</span>kmsaifullah
        </a>

        <ul className="hidden items-center gap-7 font-mono text-sm text-text-muted md:flex">
          {LINKS.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-green-bright"
              >
                <span className="text-text-faint">
                  {String(i + 1).padStart(2, "0")}.
                </span>{" "}
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden items-center rounded-full border border-border-strong px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-green-bright hover:text-green-bright md:inline-flex"
        >
          Let&apos;s talk
        </a>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-text-primary md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-border bg-bg md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4 font-mono text-sm">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-2.5 text-text-muted hover:text-green-bright"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
