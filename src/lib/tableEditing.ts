import { MAX_TABLE_COLUMNS, MAX_TABLE_ROWS } from "./tableMarkup";

export interface TableContext {
  table: HTMLTableElement;
  row: HTMLTableRowElement;
  cell: HTMLTableCellElement;
  rowIndex: number;
  columnIndex: number;
  rowCount: number;
  columnCount: number;

  inHeader: boolean;
}

export function getTableContext(
  node: Node | null,
  root: HTMLElement,
): TableContext | null {
  if (!node) return null;

  const element = node instanceof Element ? node : node.parentElement;
  const cell = element?.closest("td, th") as HTMLTableCellElement | null;
  if (!cell || !root.contains(cell)) return null;

  const row = cell.parentElement as HTMLTableRowElement | null;
  const table = cell.closest("table") as HTMLTableElement | null;
  if (!row || !table || !root.contains(table)) return null;

  return {
    table,
    row,
    cell,
    rowIndex: row.rowIndex,
    columnIndex: cell.cellIndex,
    rowCount: table.rows.length,
    columnCount: getColumnCount(table),
    inHeader: row.parentElement?.tagName === "THEAD",
  };
}

function getColumnCount(table: HTMLTableElement) {
  return Array.from(table.rows).reduce(
    (max, row) => Math.max(max, row.cells.length),
    0,
  );
}

function createCell(doc: Document, tag: "td" | "th") {
  const cell = doc.createElement(tag);
  if (tag === "th") cell.setAttribute("scope", "col");

  cell.appendChild(doc.createElement("br"));
  return cell;
}

export function addRow(
  ctx: TableContext,
  position: "above" | "below",
): HTMLTableCellElement | null {
  if (ctx.rowCount >= MAX_TABLE_ROWS) return null;
  // Nothing can sit above the header row.
  if (ctx.inHeader && position === "above") return null;

  const doc = ctx.table.ownerDocument;
  const newRow = doc.createElement("tr");
  for (let i = 0; i < ctx.columnCount; i++) {
    newRow.appendChild(createCell(doc, "td"));
  }

  if (ctx.inHeader) {
    let tbody = ctx.table.tBodies[0];
    if (!tbody) {
      tbody = doc.createElement("tbody");
      ctx.table.appendChild(tbody);
    }
    tbody.insertBefore(newRow, tbody.firstChild);
  } else {
    ctx.row.insertAdjacentElement(
      position === "above" ? "beforebegin" : "afterend",
      newRow,
    );
  }

  return newRow.cells[Math.min(ctx.columnIndex, newRow.cells.length - 1)];
}

export function deleteRow(ctx: TableContext): HTMLTableCellElement | null {
  if (ctx.rowCount <= 1) return null;

  const section = ctx.row.parentElement;
  ctx.row.remove();

  if (
    section &&
    section !== ctx.table &&
    section.querySelector("tr") === null
  ) {
    section.remove();
  }

  const rows = ctx.table.rows;
  const target = rows[Math.min(ctx.rowIndex, rows.length - 1)];
  return (
    target.cells[Math.min(ctx.columnIndex, target.cells.length - 1)] ?? null
  );
}

export function addColumn(
  ctx: TableContext,
  position: "left" | "right",
): HTMLTableCellElement | null {
  if (ctx.columnCount >= MAX_TABLE_COLUMNS) return null;

  const doc = ctx.table.ownerDocument;
  let focusCell: HTMLTableCellElement | null = null;

  Array.from(ctx.table.rows).forEach((row) => {
    const reference =
      row.cells[ctx.columnIndex] ?? row.cells[row.cells.length - 1];

    const tag = reference?.tagName === "TH" ? "th" : "td";
    const cell = createCell(doc, tag);

    if (reference) {
      reference.insertAdjacentElement(
        position === "left" ? "beforebegin" : "afterend",
        cell,
      );
    } else {
      row.appendChild(cell);
    }

    if (row === ctx.row) focusCell = cell;
  });

  return focusCell;
}

export function deleteColumn(ctx: TableContext): HTMLTableCellElement | null {
  if (ctx.columnCount <= 1) return null;

  Array.from(ctx.table.rows).forEach((row) => {
    row.cells[ctx.columnIndex]?.remove();
  });

  return (
    ctx.row.cells[Math.min(ctx.columnIndex, ctx.row.cells.length - 1)] ?? null
  );
}

export function deleteTable(ctx: TableContext): Element | null {
  const neighbour =
    ctx.table.nextElementSibling ?? ctx.table.previousElementSibling;
  ctx.table.remove();
  return neighbour;
}

export function getAdjacentCell(
  ctx: TableContext,
  direction: 1 | -1,
): HTMLTableCellElement | null {
  const cells = Array.from(ctx.table.rows).flatMap((row) =>
    Array.from(row.cells),
  );
  const index = cells.indexOf(ctx.cell);
  return cells[index + direction] ?? null;
}

export function placeCaretIn(
  element: Element,
  { selectContents = false }: { selectContents?: boolean } = {},
) {
  const doc = element.ownerDocument;
  const selection = doc.defaultView?.getSelection();
  if (!selection) return;

  const range = doc.createRange();
  range.selectNodeContents(element);
  if (!selectContents) range.collapse(true);

  selection.removeAllRanges();
  selection.addRange(range);
}
