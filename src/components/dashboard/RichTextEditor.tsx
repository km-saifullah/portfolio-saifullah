"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  Image as ImageIcon,
  List,
  ListOrdered,
  Undo2,
  Redo2,
  RemoveFormatting,
  X,
  ExternalLink,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

type Command =
  | "bold"
  | "italic"
  | "underline"
  | "insertUnorderedList"
  | "insertOrderedList"
  | "formatBlock"
  | "fontSize"
  | "removeFormat"
  | "undo"
  | "redo";

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const savedRangeRef = useRef<Range | null>(null);

  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageError, setImageError] = useState("");

  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [linkError, setLinkError] = useState("");
  const [openInNewTab, setOpenInNewTab] = useState(true);

  useEffect(() => {
    if (!editorRef.current) return;

    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const saveSelection = () => {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) {
      return;
    }

    const range = selection.getRangeAt(0);

    if (
      editorRef.current &&
      editorRef.current.contains(range.commonAncestorContainer)
    ) {
      savedRangeRef.current = range.cloneRange();
    }
  };

  const restoreSelection = () => {
    const editor = editorRef.current;
    const range = savedRangeRef.current;

    if (!editor || !range) return;

    editor.focus();

    const selection = window.getSelection();

    if (!selection) return;

    selection.removeAllRanges();
    selection.addRange(range);
  };

  const focusEditor = () => {
    editorRef.current?.focus();
  };

  const exec = (command: Command, commandValue?: string) => {
    restoreSelection();

    if (!savedRangeRef.current) {
      focusEditor();
    }

    document.execCommand(command, false, commandValue);

    updateEditor();
  };

  const updateEditor = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    saveSelection();
    updateEditor();
  };

  const escapeAttribute = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();

    const text = event.clipboardData.getData("text/plain");

    if (!text) return;

    restoreSelection();

    const normalizedText = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    const paragraphs = normalizedText.split(/\n{2,}/);

    const html = paragraphs
      .map((paragraph) => {
        const lines = paragraph.split("\n");

        const content = lines
          .map((line) => escapeAttribute(line))
          .join("<br />");

        return `<p>${content}</p>`;
      })
      .join("");

    document.execCommand("insertHTML", false, html);

    updateEditor();
    saveSelection();
  };

  const openImageDialog = () => {
    saveSelection();

    setImageUrl("");
    setImageAlt("");
    setImageError("");

    setShowImageDialog(true);
  };

  const closeImageDialog = () => {
    setShowImageDialog(false);
    setImageUrl("");
    setImageAlt("");
    setImageError("");
  };

  const insertImage = () => {
    const url = imageUrl.trim();
    const alt = imageAlt.trim();

    if (!url) {
      setImageError("Please enter an image URL.");
      return;
    }

    try {
      const parsedUrl = new URL(url);

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        setImageError("Please enter a valid HTTP or HTTPS image URL.");
        return;
      }
    } catch {
      setImageError("Please enter a valid image URL.");
      return;
    }

    if (!alt) {
      setImageError("Please add alternative text for accessibility.");
      return;
    }

    restoreSelection();

    const imageHtml = `
      <img
        src="${escapeAttribute(url)}"
        alt="${escapeAttribute(alt)}"
      />
    `;

    document.execCommand("insertHTML", false, imageHtml);

    updateEditor();
    closeImageDialog();
  };

  const openLinkDialog = () => {
    saveSelection();

    const selection = window.getSelection();
    const selectedText = selection?.toString() ?? "";

    setLinkText(selectedText);
    setLinkUrl("");
    setLinkError("");
    setOpenInNewTab(true);

    setShowLinkDialog(true);
  };

  const closeLinkDialog = () => {
    setShowLinkDialog(false);
    setLinkUrl("");
    setLinkText("");
    setLinkError("");
    setOpenInNewTab(true);
  };

  const insertLink = () => {
    const url = linkUrl.trim();
    const text = linkText.trim();

    if (!url) {
      setLinkError("Please enter a URL.");
      return;
    }

    if (!text) {
      setLinkError("Please enter the link text.");
      return;
    }

    try {
      const parsedUrl = new URL(url);

      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        setLinkError("Only HTTP and HTTPS URLs are supported.");
        return;
      }
    } catch {
      setLinkError("Please enter a valid URL.");
      return;
    }

    restoreSelection();

    const selection = window.getSelection();

    if (selection && !selection.isCollapsed) {
      document.execCommand("createLink", false, url);

      const anchor =
        selection.anchorNode?.parentElement?.closest("a") ??
        selection.focusNode?.parentElement?.closest("a");

      if (anchor) {
        if (openInNewTab) {
          anchor.setAttribute("target", "_blank");
          anchor.setAttribute("rel", "noopener noreferrer");
        } else {
          anchor.removeAttribute("target");
          anchor.removeAttribute("rel");
        }
      }
    } else {
      const linkHtml = `
        <a
          href="${escapeAttribute(url)}"
          ${openInNewTab ? 'target="_blank" rel="noopener noreferrer"' : ""}
        >
          ${escapeAttribute(text)}
        </a>
      `;

      document.execCommand("insertHTML", false, linkHtml);
    }

    updateEditor();
    closeLinkDialog();
  };

  return (
    <>
      <div className="mt-2 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <div
          className="
            sticky top-0 z-30
            flex flex-wrap items-center gap-1
            border-b border-border
            bg-surface/95
            p-2.5
            backdrop-blur-md
          "
        >
          <ToolbarButton
            label="Bold"
            onMouseDown={saveSelection}
            onClick={() => exec("bold")}
          >
            <Bold size={16} />
          </ToolbarButton>

          <ToolbarButton
            label="Italic"
            onMouseDown={saveSelection}
            onClick={() => exec("italic")}
          >
            <Italic size={16} />
          </ToolbarButton>

          <ToolbarButton
            label="Underline"
            onMouseDown={saveSelection}
            onClick={() => exec("underline")}
          >
            <Underline size={16} />
          </ToolbarButton>

          <div className="mx-1.5 h-6 w-px bg-border" />

          {/* Text style */}
          <select
            aria-label="Text style"
            defaultValue="p"
            onMouseDown={saveSelection}
            onChange={(e) => {
              exec("formatBlock", e.target.value);
            }}
            className="
              h-9
              rounded-xl
              border border-border
              bg-surface
              px-3
              text-xs
              text-text-muted
              outline-none
              transition-colors
              hover:border-green-bright/40
              focus:border-green-bright
            "
          >
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="blockquote">Quote</option>
          </select>

          {/* Font size */}
          <select
            aria-label="Text size"
            defaultValue="3"
            onMouseDown={saveSelection}
            onChange={(e) => {
              exec("fontSize", e.target.value);
            }}
            className="
              h-9
              rounded-xl
              border border-border
              bg-surface
              px-3
              text-xs
              text-text-muted
              outline-none
              transition-colors
              hover:border-green-bright/40
              focus:border-green-bright
            "
          >
            <option value="2">Small</option>
            <option value="3">Normal</option>
            <option value="5">Large</option>
            <option value="6">Huge</option>
          </select>

          <div className="mx-1.5 h-6 w-px bg-border" />

          {/* Lists */}
          <ToolbarButton
            label="Bulleted list"
            onMouseDown={saveSelection}
            onClick={() => exec("insertUnorderedList")}
          >
            <List size={16} />
          </ToolbarButton>

          <ToolbarButton
            label="Numbered list"
            onMouseDown={saveSelection}
            onClick={() => exec("insertOrderedList")}
          >
            <ListOrdered size={16} />
          </ToolbarButton>

          {/* Link */}
          <ToolbarButton
            label="Insert link"
            onMouseDown={saveSelection}
            onClick={openLinkDialog}
          >
            <LinkIcon size={16} />
          </ToolbarButton>

          {/* Image */}
          <ToolbarButton
            label="Insert image"
            onMouseDown={saveSelection}
            onClick={openImageDialog}
          >
            <ImageIcon size={16} />
          </ToolbarButton>

          <div className="mx-1.5 h-6 w-px bg-border" />

          {/* Undo */}
          <ToolbarButton
            label="Undo"
            onMouseDown={saveSelection}
            onClick={() => exec("undo")}
          >
            <Undo2 size={16} />
          </ToolbarButton>

          {/* Redo */}
          <ToolbarButton
            label="Redo"
            onMouseDown={saveSelection}
            onClick={() => exec("redo")}
          >
            <Redo2 size={16} />
          </ToolbarButton>

          {/* Remove formatting */}
          <ToolbarButton
            label="Remove formatting"
            onMouseDown={saveSelection}
            onClick={() => exec("removeFormat")}
          >
            <RemoveFormatting size={16} />
          </ToolbarButton>
        </div>

        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onPaste={handlePaste}
          onKeyUp={saveSelection}
          onMouseUp={saveSelection}
          onFocus={saveSelection}
          className="
            min-h-105
            px-6 py-5
            text-sm
            leading-7
            text-text-primary
            outline-none

            [&_p]:my-3
            [&_p:first-child]:mt-0
            [&_p:last-child]:mb-0

            [&_strong]:font-bold
            [&_b]:font-bold

            [&_em]:italic
            [&_i]:italic

            [&_u]:underline
            [&_u]:underline-offset-2

            [&_h1]:mb-4
            [&_h1]:mt-7
            [&_h1]:text-3xl
            [&_h1]:font-bold
            [&_h1]:leading-tight

            [&_h2]:mb-3
            [&_h2]:mt-6
            [&_h2]:text-2xl
            [&_h2]:font-bold
            [&_h2]:leading-tight

            [&_h3]:mb-3
            [&_h3]:mt-5
            [&_h3]:text-xl
            [&_h3]:font-semibold
            [&_h3]:leading-tight

            [&_h4]:mb-2
            [&_h4]:mt-4
            [&_h4]:text-lg
            [&_h4]:font-semibold

            [&_ul]:my-4
            [&_ul]:list-disc
            [&_ul]:pl-7

            [&_ol]:my-4
            [&_ol]:list-decimal
            [&_ol]:pl-7

            [&_li]:my-1
            [&_li]:pl-1

            [&_blockquote]:my-5
            [&_blockquote]:border-l-2
            [&_blockquote]:border-green-bright
            [&_blockquote]:pl-4
            [&_blockquote]:italic
            [&_blockquote]:text-text-muted

            [&_a]:text-green-bright
            [&_a]:underline
            [&_a]:underline-offset-2

            [&_img]:my-5
            [&_img]:max-w-full
            [&_img]:rounded-xl
            [&_img]:border
            [&_img]:border-border

            [&_br]:leading-7

            [&_font]:text-inherit
            [&_font]:bg-transparent
          "
          data-placeholder="Write your blog post here..."
        />
      </div>

      {showLinkDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLinkDialog();
            }
          }}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green/10 text-green-bright">
                    <LinkIcon size={16} />
                  </div>

                  <h2 className="font-display text-base font-semibold">
                    Insert link
                  </h2>
                </div>

                <p className="mt-1 pl-10 text-xs text-text-faint">
                  Add a link to selected text or insert linked text.
                </p>
              </div>

              <button
                type="button"
                onClick={closeLinkDialog}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-bg hover:text-text"
                aria-label="Close dialog"
              >
                <X size={17} />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-5 p-6">
              <div>
                <label
                  htmlFor="blog-link-url"
                  className="font-mono text-xs font-medium text-text-muted"
                >
                  Link URL
                  <span className="ml-1 text-green-bright">*</span>
                </label>

                <div className="relative mt-2">
                  <LinkIcon
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-faint"
                  />

                  <input
                    id="blog-link-url"
                    type="url"
                    value={linkUrl}
                    onChange={(event) => {
                      setLinkUrl(event.target.value);
                      setLinkError("");
                    }}
                    placeholder="https://example.com"
                    className="
                      w-full
                      rounded-xl
                      border border-border
                      bg-bg
                      py-3 pl-10 pr-4
                      text-sm text-text
                      outline-none
                      transition-colors
                      placeholder:text-text-faint
                      focus:border-green-bright
                      focus:ring-1
                      focus:ring-green-bright/20
                    "
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="blog-link-text"
                  className="font-mono text-xs font-medium text-text-muted"
                >
                  Link text
                  <span className="ml-1 text-green-bright">*</span>
                </label>

                <input
                  id="blog-link-text"
                  type="text"
                  value={linkText}
                  onChange={(event) => {
                    setLinkText(event.target.value);
                    setLinkError("");
                  }}
                  placeholder="Example: Learn more about AWS"
                  className="
                    mt-2
                    w-full
                    rounded-xl
                    border border-border
                    bg-bg
                    px-4 py-3
                    text-sm text-text
                    outline-none
                    transition-colors
                    placeholder:text-text-faint
                    focus:border-green-bright
                    focus:ring-1
                    focus:ring-green-bright/20
                  "
                />

                <p className="mt-2 text-[11px] text-text-faint">
                  Selected editor text will be used automatically.
                </p>
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border bg-bg px-4 py-3 transition-colors hover:border-green-bright/40">
                <input
                  type="checkbox"
                  checked={openInNewTab}
                  onChange={(event) => setOpenInNewTab(event.target.checked)}
                  className="h-4 w-4 accent-green-bright"
                />

                <div className="flex items-center gap-2">
                  <ExternalLink size={14} className="text-text-faint" />

                  <div>
                    <p className="text-sm text-text">Open in new tab</p>

                    <p className="text-[11px] text-text-faint">
                      Opens the link without leaving your blog.
                    </p>
                  </div>
                </div>
              </label>

              {linkError && (
                <div className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-xs text-red-400">
                  {linkError}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-border bg-bg px-6 py-4">
              <button
                type="button"
                onClick={closeLinkDialog}
                className="rounded-xl border border-border px-4 py-2.5 text-sm text-text-muted transition-colors hover:bg-surface hover:text-text"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={insertLink}
                className="inline-flex items-center gap-2 rounded-xl bg-green px-5 py-2.5 text-sm font-medium text-[#04140b] transition-colors hover:bg-green-bright"
              >
                <LinkIcon size={15} />
                Insert link
              </button>
            </div>
          </div>
        </div>
      )}

      {showImageDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeImageDialog();
            }
          }}
        >
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green/10 text-green-bright">
                    <ImageIcon size={16} />
                  </div>

                  <h2 className="font-display text-base font-semibold">
                    Insert image
                  </h2>
                </div>

                <p className="mt-1 pl-10 text-xs text-text-faint">
                  Add an image from a public URL.
                </p>
              </div>

              <button
                type="button"
                onClick={closeImageDialog}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-bg hover:text-text"
                aria-label="Close dialog"
              >
                <X size={17} />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-5 p-6">
              <div>
                <label
                  htmlFor="blog-image-url"
                  className="font-mono text-xs font-medium text-text-muted"
                >
                  Image URL
                  <span className="ml-1 text-green-bright">*</span>
                </label>

                <div className="relative mt-2">
                  <ImageIcon
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-faint"
                  />

                  <input
                    id="blog-image-url"
                    type="url"
                    value={imageUrl}
                    onChange={(event) => {
                      setImageUrl(event.target.value);
                      setImageError("");
                    }}
                    placeholder="https://res.cloudinary.com/..."
                    className="
                      w-full
                      rounded-xl
                      border border-border
                      bg-bg
                      py-3 pl-10 pr-4
                      text-sm text-text
                      outline-none
                      transition-colors
                      placeholder:text-text-faint
                      focus:border-green-bright
                      focus:ring-1
                      focus:ring-green-bright/20
                    "
                    autoFocus
                  />
                </div>

                <p className="mt-2 text-[11px] text-text-faint">
                  Use a publicly accessible HTTPS image URL.
                </p>
              </div>

              <div>
                <label
                  htmlFor="blog-image-alt"
                  className="font-mono text-xs font-medium text-text-muted"
                >
                  Alternative text
                  <span className="ml-1 text-green-bright">*</span>
                </label>

                <input
                  id="blog-image-alt"
                  type="text"
                  value={imageAlt}
                  onChange={(event) => {
                    setImageAlt(event.target.value);
                    setImageError("");
                  }}
                  placeholder="Describe the image briefly"
                  className="
                    mt-2
                    w-full
                    rounded-xl
                    border border-border
                    bg-bg
                    px-4 py-3
                    text-sm text-text
                    outline-none
                    transition-colors
                    placeholder:text-text-faint
                    focus:border-green-bright
                    focus:ring-1
                    focus:ring-green-bright/20
                  "
                />

                <div className="mt-2 flex items-start gap-2">
                  <span className="mt-0.5 text-[10px] text-green-bright">
                    ✓
                  </span>

                  <p className="text-[11px] leading-5 text-text-faint">
                    Helps screen readers understand the image and improves
                    accessibility.
                  </p>
                </div>
              </div>

              {/* Preview */}
              {imageUrl.trim() && (
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-text-faint">
                    Preview
                  </p>

                  <div className="overflow-hidden rounded-xl border border-border bg-bg">
                    <img
                      src={imageUrl}
                      alt={imageAlt || "Image preview"}
                      className="max-h-52 w-full object-contain"
                      onError={() =>
                        setImageError(
                          "Unable to load this image. Check the URL.",
                        )
                      }
                      onLoad={() => setImageError("")}
                    />
                  </div>
                </div>
              )}

              {imageError && (
                <div className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-xs text-red-400">
                  {imageError}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-border bg-bg px-6 py-4">
              <button
                type="button"
                onClick={closeImageDialog}
                className="rounded-xl border border-border px-4 py-2.5 text-sm text-text-muted transition-colors hover:bg-surface hover:text-text"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={insertImage}
                className="inline-flex items-center gap-2 rounded-xl bg-green px-5 py-2.5 text-sm font-medium text-[#04140b] transition-colors hover:bg-green-bright"
              >
                <ImageIcon size={15} />
                Insert image
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ToolbarButton({
  children,
  label,
  onClick,
  onMouseDown,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  onMouseDown?: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onMouseDown={(event) => {
        event.preventDefault();
        onMouseDown?.();
      }}
      onClick={onClick}
      className="
        flex h-9 w-9
        items-center justify-center
        rounded-xl
        border border-transparent
        text-text-muted
        transition-all
        hover:border-border
        hover:bg-bg
        hover:text-green-bright
        active:scale-95
      "
    >
      {children}
    </button>
  );
}
