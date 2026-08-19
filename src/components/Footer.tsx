import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

const BLOG_LINKS = [
  {
    href: "https://dev.to/kmsaifullah",
    label: "DEV.to",
  },
  {
    href: "https://medium.com/@kmsaifullah16",
    label: "Medium",
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-7 px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-text-faint">
            © {year} Khaled Md Saifullah.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            {/* GitHub */}
            <a
              href="https://github.com/km-saifullah"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-text-muted transition-colors hover:text-green-bright"
            >
              <GithubIcon size={18} />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/kmsaifullah/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-text-muted transition-colors hover:text-green-bright"
            >
              <LinkedinIcon size={18} />
            </a>

            <span className="h-5 w-px bg-border" />

            {/* DEV.to and Medium */}
            {BLOG_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-text-muted transition-colors hover:text-green-bright"
              >
                {link.label}
              </a>
            ))}

            {/* Email */}
            <a
              href="mailto:kmsaifullah16@gmail.com"
              aria-label="Email Khaled Md Saifullah"
              className="inline-flex items-center gap-2 font-mono text-xs text-text-muted transition-colors hover:text-green-bright"
            >
              <Mail size={15} />
              kmsaifullah16@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
