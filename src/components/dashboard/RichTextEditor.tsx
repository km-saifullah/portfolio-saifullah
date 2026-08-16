"use client";

import { useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  Link as LinkIcon,
  Image as ImageIcon,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  RemoveFormatting,
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
  | "insertImage"
  | "removeFormat"
  | "undo"
  | "redo";

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    if (editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const focusEditor = () => {
    editorRef.current?.focus();
  };

  const exec = (command: Command, commandValue?: string) => {
    focusEditor();

    if (command === "createLink") {
      const url = window.prompt("Enter the URL:");

      if (!url) return;

      document.execCommand("createLink", false, url);
    } else if (command === "insertImage") {
      const url = window.prompt("Enter the image URL:");

      if (!url) return;

      const alt = window.prompt("Enter image alt text:") || "Blog image";

      document.execCommand(
        "insertHTML",
        false,
        `<img src="${escapeAttribute(url)}" alt="${escapeAttribute(alt)}" />`,
      );
    } else {
      document.execCommand(command, false, commandValue);
    }

    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
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

  return (
    <div className="mt-2 overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-bg-alt p-2">
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

        <ToolbarButton label="Insert image" onClick={() => exec("insertImage")}>
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

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="min-h-[420px] px-5 py-4 text-sm leading-7 text-text-primary outline-none"
        data-placeholder="Write your blog post here..."
      />
    </div>
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
