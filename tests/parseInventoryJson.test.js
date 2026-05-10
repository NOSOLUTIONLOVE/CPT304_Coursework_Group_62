import { describe, it, expect } from "vitest";
import { parseDataRowsFromJsonText } from "../src/inventory/parseInventoryJson.js";

describe("parseDataRowsFromJsonText", () => {
  it("accepts top-level array", () => {
    const rows = [["A", "1", "T", "RM 1", "RM 1"]];
    expect(parseDataRowsFromJsonText(JSON.stringify(rows))).toEqual(rows);
  });
  it("accepts body wrapper", () => {
    const rows = [["A", "1", "T", "RM 1", "RM 1"]];
    const out = parseDataRowsFromJsonText(JSON.stringify({ body: rows }));
    expect(out).toEqual(rows);
  });
  it("rejects invalid json", () => {
    expect(() => parseDataRowsFromJsonText("{")).toThrow(/Invalid JSON/);
  });
  it("rejects empty", () => {
    expect(() => parseDataRowsFromJsonText(JSON.stringify([]))).toThrow(/no data/);
  });
  it("rejects too many rows", () => {
    const big = new Array(5001).fill(["A", "1", "T", "RM 1", "RM 1"]);
    expect(() => parseDataRowsFromJsonText(JSON.stringify(big))).toThrow(/5000/);
  });
});