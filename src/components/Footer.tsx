import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-text-faint">
          © {year} Khaled Md Saifullah. Built with Next.js.
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/km-saifullah"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-text-muted hover:text-green-bright transition-colors"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href="https://linkedin.com/in/kmsaifullah"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-text-muted hover:text-green-bright transition-colors"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href="mailto:kmsaifullah16@gmail.com"
            aria-label="Email"
            className="text-text-muted hover:text-green-bright transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
