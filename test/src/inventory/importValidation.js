export function parseImportQuantity(raw, rowNum) {
  if (typeof raw === "number" && isFinite(raw)) {
    if (raw < 0 || raw > 1000000000) {
      throw new Error("Row " + rowNum + ": Quantity is invalid or too large.");
    }
    if (Math.floor(raw) !== raw) {
      throw new Error("Row " + rowNum + ": Quantity must be a whole number.");
    }
    return Math.floor(raw);
  }
  const s = String(raw != null ? raw : "").trim();
  if (!/^\d+$/.test(s)) {
    throw new Error("Row " + rowNum + ": Quantity must be a whole number (digits only, no letters or symbols).");
  }
  const n = parseInt(s, 10);
  if (!isFinite(n) || n > 1000000000) {
    throw new Error("Row " + rowNum + ": Quantity is invalid or too large.");
  }
  return n;
}

export function parseImportMoneyPositive(raw, rowNum, fieldLabel) {
  const orig = String(raw != null ? raw : "").trim();
  if (orig.indexOf("-") >= 0 || orig.indexOf("\u2212") >= 0) {
    throw new Error("Row " + rowNum + ": " + fieldLabel + " cannot be negative.");
  }
  const s = orig.replace(/^RM\s*/i, "").replace(/,/g, "").trim();
  if (!/^\d+(\.\d+)?$/.test(s)) {
    throw new Error("Row " + rowNum + ": " + fieldLabel + " must be a positive amount like RM 129.00.");
  }
  const n = parseFloat(s);
  if (!isFinite(n) || n <= 0) {
    throw new Error("Row " + rowNum + ": " + fieldLabel + " must be greater than 0.");
  }
  return n;
}

export function normalizeImportRow(row, index) {
  if (!Array.isArray(row)) throw new Error("Row " + (index + 1) + " is not a valid array.");
  if (row.length < 5) throw new Error("Row " + (index + 1) + " is missing required columns.");
  const itemName = row[0] ? row[0].toString().trim().substring(0, 100) : "";
  const type = row[2] ? row[2].toString().trim().substring(0, 50) : "";
  if (itemName === "") throw new Error("Row " + (index + 1) + ": Item Name cannot be empty.");
  if (type === "") throw new Error("Row " + (index + 1) + ": Type cannot be empty.");
  const rowNum = index + 1;
  const quantity = parseImportQuantity(row[1], rowNum);
  const unit = parseImportMoneyPositive(row[3], rowNum, "Unit price");
  const expectedTotal = Math.round(quantity * unit * 100) / 100;
  return [
    itemName,
    quantity.toFixed(0),
    type,
    "RM " + unit.toFixed(2),
    "RM " + expectedTotal.toFixed(2),
  ];
}

export function tryNormalizeImportRow(row, index) {
  try {
    return { ok: true, row: normalizeImportRow(row, index) };
  } catch (e) {
    return { ok: false, msg: e.message || String(e) };
  }
}