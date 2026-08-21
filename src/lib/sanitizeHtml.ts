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
];

const allowedAttributes = {
  a: ["href", "target", "rel"],

  img: ["src", "alt", "width", "height"],

  font: ["size"],

  pre: ["class"],

  code: ["class"],
};

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
