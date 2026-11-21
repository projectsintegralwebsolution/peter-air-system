"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  Quote,
  Link2,
  Unlink,
  Image as ImageIcon,
  Minus,
  RotateCcw,
  RotateCw,
  RemoveFormatting,
  Code,
  Eye,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content here...",
  minHeight = "360px",
}: RichTextEditorProps) {
  const [mode, setMode] = useState<"visual" | "html">("visual");
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);

  // Helper to sanitize corrupt srcset attributes from legacy imports
  const sanitizeHtml = (raw: string) => {
    if (!raw) return "";
    return raw.replace(/\s*srcset="[^"]*(?:jpgs|pngs):\/\/[^"]*"/gi, "");
  };

  // Synchronize external value into the visual editor canvas safely without resetting cursor
  useEffect(() => {
    if (editorRef.current && mode === "visual") {
      if (isInternalChange.current) {
        isInternalChange.current = false;
        return;
      }
      const cleaned = sanitizeHtml(value || "");
      if (editorRef.current.innerHTML !== cleaned) {
        editorRef.current.innerHTML = cleaned;
      }
    }
  }, [value, mode]);

  // Handle user input in visual mode
  const handleInput = useCallback(() => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      isInternalChange.current = true;
      onChange(html);
    }
  }, [onChange]);

  // Execute standard formatting commands
  const exec = (command: string, arg: string | undefined = undefined) => {
    if (mode !== "visual") return;
    if (editorRef.current) {
      editorRef.current.focus();
    }
    document.execCommand(command, false, arg);
    handleInput();
  };

  // Insert Link dialog
  const handleInsertLink = () => {
    if (mode !== "visual") return;
    const url = prompt("Enter hyperlink URL (e.g. https://... or /contact/):");
    if (url) {
      exec("createLink", url);
    }
  };

  // Insert Image dialog
  const handleInsertImage = () => {
    if (mode !== "visual") return;
    const url = prompt("Enter image URL (e.g. /images/AHU.jpeg or https://...):");
    if (url) {
      exec("insertImage", url.trim());
    }
  };

  // Word & character stats calculation
  const textContent = (value || "").replace(/<[^>]+>/g, " ").trim();
  const wordCount = textContent ? textContent.split(/\s+/).length : 0;
  const charCount = textContent.length;

  return (
    <div className="w-full border border-slate-300 rounded-xl overflow-hidden bg-white shadow-xs focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-200 transition">
      {/* 1. TOP TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 p-2 bg-slate-50/90 border-b border-slate-200 text-slate-700 select-none">
        <div className="flex flex-wrap items-center gap-1">
          {/* Paragraph / Headings dropdown */}
          <select
            aria-label="Format Block"
            disabled={mode === "html"}
            onChange={(e) => {
              const val = e.target.value;
              if (val) {
                exec("formatBlock", `<${val}>`);
                e.target.value = "";
              }
            }}
            defaultValue=""
            className="text-xs font-medium px-2 py-1 rounded border border-slate-300 bg-white hover:bg-slate-50 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <option value="" disabled>
              Heading Style ▾
            </option>
            <option value="p">Normal Paragraph</option>
            <option value="h1">Heading 1 (Main Title)</option>
            <option value="h2">Heading 2 (Major)</option>
            <option value="h3">Heading 3 (Sub-section)</option>
            <option value="h4">Heading 4 (Minor title)</option>
          </select>

          <div className="w-px h-5 bg-slate-300 mx-1" />

          {/* Quick Headings */}
          <button
            type="button"
            title="Heading 1"
            disabled={mode === "html"}
            onClick={() => exec("formatBlock", "<h1>")}
            className="p-1.5 rounded hover:bg-slate-200/80 active:bg-slate-300 disabled:opacity-40 text-slate-700 transition"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Heading 2"
            disabled={mode === "html"}
            onClick={() => exec("formatBlock", "<h2>")}
            className="p-1.5 rounded hover:bg-slate-200/80 active:bg-slate-300 disabled:opacity-40 text-slate-700 transition"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Heading 3"
            disabled={mode === "html"}
            onClick={() => exec("formatBlock", "<h3>")}
            className="p-1.5 rounded hover:bg-slate-200/80 active:bg-slate-300 disabled:opacity-40 text-slate-700 transition"
          >
            <Heading3 className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Heading 4"
            disabled={mode === "html"}
            onClick={() => exec("formatBlock", "<h4>")}
            className="p-1.5 rounded hover:bg-slate-200/80 active:bg-slate-300 disabled:opacity-40 text-slate-700 transition"
          >
            <Heading4 className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-slate-300 mx-1" />

          {/* Inline formatting */}
          <button
            type="button"
            title="Bold (Ctrl+B)"
            disabled={mode === "html"}
            onClick={() => exec("bold")}
            className="p-1.5 rounded hover:bg-slate-200/80 active:bg-slate-300 disabled:opacity-40 text-slate-700 transition"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Italic (Ctrl+I)"
            disabled={mode === "html"}
            onClick={() => exec("italic")}
            className="p-1.5 rounded hover:bg-slate-200/80 active:bg-slate-300 disabled:opacity-40 text-slate-700 transition"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Underline (Ctrl+U)"
            disabled={mode === "html"}
            onClick={() => exec("underline")}
            className="p-1.5 rounded hover:bg-slate-200/80 active:bg-slate-300 disabled:opacity-40 text-slate-700 transition"
          >
            <Underline className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Strikethrough"
            disabled={mode === "html"}
            onClick={() => exec("strikeThrough")}
            className="p-1.5 rounded hover:bg-slate-200/80 active:bg-slate-300 disabled:opacity-40 text-slate-700 transition"
          >
            <Strikethrough className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-slate-300 mx-1" />

          {/* Lists */}
          <button
            type="button"
            title="Bulleted List"
            disabled={mode === "html"}
            onClick={() => exec("insertUnorderedList")}
            className="p-1.5 rounded hover:bg-slate-200/80 active:bg-slate-300 disabled:opacity-40 text-slate-700 transition"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Numbered List"
            disabled={mode === "html"}
            onClick={() => exec("insertOrderedList")}
            className="p-1.5 rounded hover:bg-slate-200/80 active:bg-slate-300 disabled:opacity-40 text-slate-700 transition"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Blockquote"
            disabled={mode === "html"}
            onClick={() => exec("formatBlock", "<blockquote>")}
            className="p-1.5 rounded hover:bg-slate-200/80 active:bg-slate-300 disabled:opacity-40 text-slate-700 transition"
          >
            <Quote className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-slate-300 mx-1" />

          {/* Links & Divider */}
          <button
            type="button"
            title="Insert Link"
            disabled={mode === "html"}
            onClick={handleInsertLink}
            className="p-1.5 rounded hover:bg-slate-200/80 active:bg-slate-300 disabled:opacity-40 text-slate-700 transition"
          >
            <Link2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Remove Link"
            disabled={mode === "html"}
            onClick={() => exec("unlink")}
            className="p-1.5 rounded hover:bg-slate-200/80 active:bg-slate-300 disabled:opacity-40 text-slate-700 transition"
          >
            <Unlink className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Horizontal Divider"
            disabled={mode === "html"}
            onClick={() => exec("insertHorizontalRule")}
            className="p-1.5 rounded hover:bg-slate-200/80 active:bg-slate-300 disabled:opacity-40 text-slate-700 transition"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Insert Image"
            disabled={mode === "html"}
            onClick={handleInsertImage}
            className="p-1.5 rounded hover:bg-slate-200/80 active:bg-slate-300 disabled:opacity-40 text-slate-700 transition"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-slate-300 mx-1" />

          {/* Undo / Redo / Clear formatting */}
          <button
            type="button"
            title="Undo"
            disabled={mode === "html"}
            onClick={() => exec("undo")}
            className="p-1.5 rounded hover:bg-slate-200/80 active:bg-slate-300 disabled:opacity-40 text-slate-700 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Redo"
            disabled={mode === "html"}
            onClick={() => exec("redo")}
            className="p-1.5 rounded hover:bg-slate-200/80 active:bg-slate-300 disabled:opacity-40 text-slate-700 transition"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            type="button"
            title="Clear Formatting"
            disabled={mode === "html"}
            onClick={() => exec("removeFormat")}
            className="p-1.5 rounded hover:bg-slate-200/80 active:bg-slate-300 disabled:opacity-40 text-slate-700 transition"
          >
            <RemoveFormatting className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switcher Buttons: Visual (WYSIWYG) vs HTML Source */}
        <div className="flex items-center gap-1 bg-slate-200/70 p-0.5 rounded-lg border border-slate-300">
          <button
            type="button"
            onClick={() => setMode("visual")}
            className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition ${
              mode === "visual"
                ? "bg-white text-[#063B5C] shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Visual</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("html")}
            className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition ${
              mode === "html"
                ? "bg-white text-[#063B5C] shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>HTML Source</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN EDITABLE CONTENT CANVAS */}
      <div className="relative">
        {mode === "visual" ? (
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            onInput={handleInput}
            onBlur={handleInput}
            style={{ minHeight }}
            data-placeholder={placeholder}
            className="w-full p-4 sm:p-6 outline-none overflow-y-auto text-slate-800 text-sm leading-relaxed prose prose-slate max-w-none focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-slate-400 empty:before:pointer-events-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-slate-900 [&_h1]:mt-6 [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-5 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-900 [&_h3]:mt-4 [&_h3]:mb-2 [&_h4]:text-base [&_h4]:font-semibold [&_h4]:text-slate-900 [&_h4]:mt-3 [&_h4]:mb-1 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3 [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-[#063B5C] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-3 [&_blockquote]:text-slate-600 [&_a]:text-[#063B5C] [&_a]:underline [&_hr]:my-4 [&_hr]:border-slate-300 [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-3 [&_img]:shadow-xs"
          />
        ) : (
          <textarea
            rows={16}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            style={{ minHeight }}
            className="w-full p-4 font-mono text-xs text-slate-800 bg-slate-900/5 focus:outline-none border-none resize-y"
            placeholder="Type raw HTML here..."
          />
        )}
      </div>

      {/* 3. FOOTER STATS BAR */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 font-medium">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{mode === "visual" ? "Visual WYSIWYG Mode" : "HTML Source Mode"}</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-400">Writes clean HTML automatically in the background</span>
        </div>
        <div className="flex items-center gap-3 font-mono">
          <span>{wordCount} words</span>
          <span>{charCount} characters</span>
        </div>
      </div>
    </div>
  );
}
