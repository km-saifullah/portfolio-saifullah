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
  "span",
];

const allowedAttributes = {
  a: ["href", "target", "rel"],
  img: ["src", "alt", "width", "height"],
  font: ["size"],
  span: ["style"],
};

export function sanitizeBlogHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags,

    allowedAttributes,

    allowedSchemes: ["http", "https", "mailto"],

    allowedSchemesByTag: {
      img: ["http", "https"],
      a: ["http", "https", "mailto"],
    },

    allowedStyles: {
      span: {
        "font-size": [/^(\d+(\.\d+)?)(px|em|rem|%)$/],
      },
    },
    transformTags: {
      div: "p",

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
}
