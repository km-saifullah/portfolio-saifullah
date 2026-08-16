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
  | "createLink"
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

  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    if (!editorRef.current) return;

    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  /*
   * Save the current cursor/selection.
   */
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
    focusEditor();

    if (command === "createLink") {
      saveSelection();

      const url = window.prompt("Enter the URL:");

      if (!url) {
        restoreSelection();
        return;
      }

      restoreSelection();

      document.execCommand("createLink", false, url);
    } else {
      document.execCommand(command, false, commandValue);
    }

    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    saveSelection();

    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const escapeAttribute = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

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

    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }

    closeImageDialog();
  };

  return (
    <>
      <div className="mt-2 overflow-visible rounded-xl border border-border bg-surface">
        <div className="sticky top-0 z-30 flex flex-wrap items-center gap-1 border-b border-border bg-surface/95 p-2 backdrop-blur-md">
          <ToolbarButton label="Bold" onClick={() => exec("bold")}>
            <Bold size={16} />
          </ToolbarButton>

          <ToolbarButton label="Italic" onClick={() => exec("italic")}>
            <Italic size={16} />
          </ToolbarButton>

          <ToolbarButton label="Underline" onClick={() => exec("underline")}>
            <Underline size={16} />
          </ToolbarButton>

          <div className="mx-1 h-6 w-px bg-border" />

          <select
            aria-label="Text style"
            defaultValue="p"
            onChange={(e) => {
              exec("formatBlock", e.target.value);
            }}
            className="h-8 rounded-md border border-border bg-surface px-2 text-xs text-text-muted outline-none focus:border-green-bright"
          >
            <option value="p">Paragraph</option>

            <option value="h1">Heading 1</option>

            <option value="h2">Heading 2</option>

            <option value="h3">Heading 3</option>

            <option value="h4">Heading 4</option>

            <option value="blockquote">Quote</option>
          </select>

          <select
            aria-label="Text size"
            defaultValue="3"
            onChange={(e) => {
              exec("fontSize", e.target.value);
            }}
            className="h-8 rounded-md border border-border bg-surface px-2 text-xs text-text-muted outline-none focus:border-green-bright"
          >
            <option value="2">Small</option>

            <option value="3">Normal</option>

            <option value="5">Large</option>

            <option value="6">Huge</option>
          </select>

          <div className="mx-1 h-6 w-px bg-border" />

          <ToolbarButton
            label="Bulleted list"
            onClick={() => exec("insertUnorderedList")}
          >
            <List size={16} />
          </ToolbarButton>

          <ToolbarButton
            label="Numbered list"
            onClick={() => exec("insertOrderedList")}
          >
            <ListOrdered size={16} />
          </ToolbarButton>

          <ToolbarButton label="Link" onClick={() => exec("createLink")}>
            <LinkIcon size={16} />
          </ToolbarButton>

          <ToolbarButton label="Insert image" onClick={openImageDialog}>
            <ImageIcon size={16} />
          </ToolbarButton>

          <div className="mx-1 h-6 w-px bg-border" />

          <ToolbarButton label="Undo" onClick={() => exec("undo")}>
            <Undo2 size={16} />
          </ToolbarButton>

          <ToolbarButton label="Redo" onClick={() => exec("redo")}>
            <Redo2 size={16} />
          </ToolbarButton>

          <ToolbarButton
            label="Remove formatting"
            onClick={() => exec("removeFormat")}
          >
            <RemoveFormatting size={16} />
          </ToolbarButton>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyUp={saveSelection}
          onMouseUp={saveSelection}
          onFocus={saveSelection}
          className="min-h-[420px] px-5 py-4 text-sm leading-7 text-text-primary outline-none"
          data-placeholder="Write your blog post here..."
        />
      </div>

      {/* Image dialog */}
      {showImageDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
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

            {/* Form */}
            <div className="space-y-5 p-6">
              {/* URL */}
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
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      setImageError("");
                    }}
                    placeholder="https://res.cloudinary.com/..."
                    className="w-full rounded-lg border border-border bg-bg py-3 pl-10 pr-4 text-sm text-text outline-none transition-colors placeholder:text-text-faint focus:border-green-bright focus:ring-1 focus:ring-green-bright/20"
                    autoFocus
                  />
                </div>

                <p className="mt-2 text-[11px] leading-5 text-text-faint">
                  Use a publicly accessible HTTPS image URL.
                </p>
              </div>

              {/* Alt */}
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
                  onChange={(e) => {
                    setImageAlt(e.target.value);
                    setImageError("");
                  }}
                  placeholder="Describe the image briefly"
                  className="mt-2 w-full rounded-lg border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-colors placeholder:text-text-faint focus:border-green-bright focus:ring-1 focus:ring-green-bright/20"
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
                <div className="rounded-lg border border-red-400/20 bg-red-400/5 px-4 py-3 text-xs text-red-400">
                  {imageError}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-border bg-bg-alt px-6 py-4">
              <button
                type="button"
                onClick={closeImageDialog}
                className="rounded-lg border border-border px-4 py-2.5 text-sm text-text-muted transition-colors hover:bg-surface hover:text-text"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={insertImage}
                className="inline-flex items-center gap-2 rounded-lg bg-green px-5 py-2.5 text-sm font-medium text-[#04140b] transition-colors hover:bg-green-bright"
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
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-hover hover:text-green-bright"
    >
      {children}
    </button>
  );
}
