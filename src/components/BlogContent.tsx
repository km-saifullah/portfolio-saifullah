"use client";

import { useEffect, useRef } from "react";

interface BlogContentProps {
  content: string;
  className?: string;
}

export default function BlogContent({
  content,
  className = "",
}: BlogContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = contentRef.current;

    if (!container) return;

    const codeBlocks = container.querySelectorAll("pre");

    const cleanupFunctions: (() => void)[] = [];

    codeBlocks.forEach((pre) => {
      const code = pre.querySelector("code");

      if (!code) return;

      if (pre.querySelector("[data-code-toolbar]")) {
        return;
      }

      pre.classList.add("blog-code-block");

      const toolbar = document.createElement("div");

      toolbar.setAttribute("data-code-toolbar", "true");

      toolbar.className =
        "flex items-center justify-between border-b border-border bg-surface px-4 py-2.5";

      const label = document.createElement("span");

      label.className =
        "font-mono text-[10px] uppercase tracking-[0.12em] text-text-faint";

      label.textContent = "Code";

      const button = document.createElement("button");

      button.type = "button";
      button.setAttribute("data-code-copy-button", "true");
      button.setAttribute("aria-label", "Copy code");
      button.title = "Copy code";

      button.className =
        "inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 font-mono text-[10px] text-text-muted transition-all duration-200 hover:border-green-bright hover:bg-green-bright/5 hover:text-green-bright";

      const icon = document.createElement("span");

      icon.className = "flex items-center justify-center";

      const copyText = document.createElement("span");

      copyText.textContent = "Copy";

      const copyIconSvg = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <rect
            width="14"
            height="14"
            x="8"
            y="8"
            rx="2"
            ry="2"
          />
          <path
            d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
          />
        </svg>
      `;

      const checkIconSvg = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      `;

      icon.innerHTML = copyIconSvg;

      button.appendChild(icon);
      button.appendChild(copyText);

      toolbar.appendChild(label);
      toolbar.appendChild(button);

      const codeWrapper = document.createElement("div");

      codeWrapper.className = "blog-code-wrapper";

      code.classList.add("blog-code");

      code.style.whiteSpace = "pre";

      pre.insertBefore(toolbar, pre.firstChild);

      pre.insertBefore(codeWrapper, code);

      codeWrapper.appendChild(code);

      const handleCopy = async () => {
        const codeText = code.textContent ?? "";

        try {
          if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(codeText);
          } else {
            throw new Error("Clipboard API unavailable");
          }
        } catch {
          const textarea = document.createElement("textarea");

          textarea.value = codeText;

          textarea.style.position = "fixed";
          textarea.style.left = "-9999px";
          textarea.style.top = "0";
          textarea.style.opacity = "0";
          textarea.style.pointerEvents = "none";

          document.body.appendChild(textarea);

          textarea.focus();
          textarea.select();

          try {
            document.execCommand("copy");
          } finally {
            textarea.remove();
          }
        }

        icon.innerHTML = checkIconSvg;

        copyText.textContent = "Copied";

        button.classList.add(
          "border-green-bright",
          "bg-green-bright/5",
          "text-green-bright",
        );

        button.setAttribute("aria-label", "Code copied");
        button.title = "Code copied";

        window.setTimeout(() => {
          icon.innerHTML = copyIconSvg;

          copyText.textContent = "Copy";

          button.classList.remove(
            "border-green-bright",
            "bg-green-bright/5",
            "text-green-bright",
          );

          button.setAttribute("aria-label", "Copy code");
          button.title = "Copy code";
        }, 1800);
      };

      button.addEventListener("click", handleCopy);

      cleanupFunctions.push(() => {
        button.removeEventListener("click", handleCopy);
      });
    });

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [content]);

  return (
    <div
      ref={contentRef}
      className={`
        prose-content
        blog-content
        text-[15px]
        leading-7
        text-text-primary

        [&_p]:my-4
        [&_p]:leading-7

        [&_h1]:mb-4
        [&_h1]:mt-9
        [&_h1]:text-3xl
        [&_h1]:font-semibold
        [&_h1]:leading-tight

        [&_h2]:mb-3
        [&_h2]:mt-8
        [&_h2]:text-2xl
        [&_h2]:font-semibold
        [&_h2]:leading-tight

        [&_h3]:mb-2
        [&_h3]:mt-7
        [&_h3]:text-xl
        [&_h3]:font-semibold
        [&_h3]:leading-tight

        [&_h4]:mb-2
        [&_h4]:mt-6
        [&_h4]:text-lg
        [&_h4]:font-semibold

        [&_strong]:font-semibold
        [&_b]:font-semibold

        [&_em]:italic
        [&_i]:italic

        [&_u]:underline
        [&_u]:underline-offset-2

        [&_ul]:my-5
        [&_ul]:list-disc
        [&_ul]:pl-6

        [&_ol]:my-5
        [&_ol]:list-decimal
        [&_ol]:pl-6

        [&_li]:my-1

        [&_blockquote]:my-6
        [&_blockquote]:border-l-2
        [&_blockquote]:border-green-bright
        [&_blockquote]:pl-5
        [&_blockquote]:italic
        [&_blockquote]:text-text-muted

        [&_a]:text-green-bright
        [&_a]:underline
        [&_a]:underline-offset-2

        [&_img]:my-7
        [&_img]:block
        [&_img]:h-auto
        [&_img]:max-w-full
        [&_img]:rounded-xl
        [&_img]:border
        [&_img]:border-border

        [&_hr]:my-8
        [&_hr]:border-border

        [&_font[size='2']]:text-sm
        [&_font[size='3']]:text-base
        [&_font[size='5']]:text-xl
        [&_font[size='6']]:text-2xl

        ${className}
      `}
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
}
