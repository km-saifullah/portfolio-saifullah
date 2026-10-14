export const MAX_TABLE_ROWS = 30;
export const MAX_TABLE_COLUMNS = 10;

export const TABLE_SCROLL_CLASS = "blog-table-scroll";

export type TableSizeResult =
  | { ok: true; rows: number; columns: number }
  | { ok: false; error: string };

export function parseTableSize(
  rowsText: string,
  columnsText: string,
): TableSizeResult {
  const rows = Number(rowsText.trim());
  const columns = Number(columnsText.trim());

  if (
    rowsText.trim() === "" ||
    !Number.isInteger(rows) ||
    rows < 1 ||
    rows > MAX_TABLE_ROWS
  ) {
    return {
      ok: false,
      error: `Rows must be a whole number between 1 and ${MAX_TABLE_ROWS}.`,
    };
  }

  if (
    columnsText.trim() === "" ||
    !Number.isInteger(columns) ||
    columns < 1 ||
    columns > MAX_TABLE_COLUMNS
  ) {
    return {
      ok: false,
      error: `Columns must be a whole number between 1 and ${MAX_TABLE_COLUMNS}.`,
    };
  }

  return { ok: true, rows, columns };
}

export function buildTableHtml({
  rows,
  columns,
  header,
}: {
  rows: number;
  columns: number;
  header: boolean;
}): string {
  const rowCount = Math.min(Math.max(Math.floor(rows), 1), MAX_TABLE_ROWS);
  const columnCount = Math.min(
    Math.max(Math.floor(columns), 1),
    MAX_TABLE_COLUMNS,
  );

  const head = header
    ? `<thead><tr>${Array.from(
        { length: columnCount },
        (_, i) => `<th scope="col">Column ${i + 1}</th>`,
      ).join("")}</tr></thead>`
    : "";

  const bodyRowCount = header ? rowCount - 1 : rowCount;

  const body =
    bodyRowCount > 0
      ? `<tbody>${Array.from(
          { length: bodyRowCount },
          () =>
            `<tr>${Array.from(
              { length: columnCount },
              () => "<td><br></td>",
            ).join("")}</tr>`,
        ).join("")}</tbody>`
      : "";

  return `<table>${head}${body}</table><p><br></p>`;
}

export function wrapTablesForScroll(html: string): string {
  if (!html || !/<table[\s>]/i.test(html)) return html;

  return html
    .replace(
      /<table(?=[\s>])/gi,
      `<div class="${TABLE_SCROLL_CLASS}" role="region" aria-label="Scrollable table" tabindex="0"><table`,
    )
    .replace(/<\/table>/gi, "</table></div>");
}
