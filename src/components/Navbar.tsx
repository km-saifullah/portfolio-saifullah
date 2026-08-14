"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="font-display font-semibold text-lg tracking-tight text-text-primary"
        >
          <span className="text-green-bright">/</span>kmsaifullah
        </a>

        <ul className="hidden md:flex items-center gap-8 font-mono text-sm text-text-muted">
          {LINKS.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-green-bright transition-colors"
              >
                <span className="text-text-faint">0{i + 1}.</span> {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center rounded-full border border-border-strong px-4 py-2 text-sm font-medium text-text-primary hover:border-green-bright hover:text-green-bright transition-colors"
        >
          Let&apos;s talk
        </a>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden text-text-primary"
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
            className="md:hidden overflow-hidden bg-bg border-b border-border"
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
