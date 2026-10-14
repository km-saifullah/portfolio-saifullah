import sanitizeHtml from "sanitize-html";

const allowedTags = [
  "p",
  "br",
  "div",

  "strong",
  "b",

  "em",
  "i",

  "u",
  "s",

  "h1",
  "h2",
  "h3",
  "h4",

  "blockquote",

  "ul",
  "ol",
  "li",

  "a",

  "img",

  "hr",

  "font",

  "pre",
  "code",

  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
];

const allowedAttributes = {
  a: ["href", "target", "rel"],

  img: ["src", "alt", "width", "height"],

  font: ["size"],

  pre: ["class"],

  code: ["class"],

  th: ["colspan", "rowspan", "scope"],

  td: ["colspan", "rowspan"],
};

const MAX_CELL_SPAN = 10;

function clampSpan(value: string | undefined) {
  const span = Number.parseInt(value ?? "", 10);

  if (!Number.isFinite(span) || span < 2) return undefined;

  return String(Math.min(span, MAX_CELL_SPAN));
}

const VALID_SCOPES = ["col", "row"];

function cleanCell(tagName: string, attribs: Record<string, string>) {
  const { colspan, rowspan, scope, ...rest } = attribs;

  const cleaned: Record<string, string> = { ...rest };

  // Header cells may only declare scope="col" or scope="row".
  if (tagName === "th" && scope && VALID_SCOPES.includes(scope)) {
    cleaned.scope = scope;
  }

  const safeColspan = clampSpan(colspan);
  const safeRowspan = clampSpan(rowspan);

  if (safeColspan) cleaned.colspan = safeColspan;
  if (safeRowspan) cleaned.rowspan = safeRowspan;

  return { tagName, attribs: cleaned };
}

export function sanitizeBlogHtml(html: string) {
  if (!html) return "";

  const sanitized = sanitizeHtml(html, {
    allowedTags,

    allowedAttributes,

    allowedSchemes: ["http", "https", "mailto"],

    allowedSchemesByTag: {
      img: ["http", "https"],

      a: ["http", "https", "mailto"],
    },

    transformTags: {
      th: cleanCell,

      td: cleanCell,

      div: (_tagName, attribs) => ({
        tagName: "p",
        attribs,
      }),

      a: (_tagName, attribs) => ({
        tagName: "a",

        attribs: {
          ...attribs,
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
    },
  });

  return sanitized;
}
