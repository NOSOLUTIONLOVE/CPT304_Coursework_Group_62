import { describe, it, expect } from "vitest";
import {
  parseImportQuantity,
  parseImportMoneyPositive,
  normalizeImportRow,
  tryNormalizeImportRow,
} from "../src/inventory/importValidation.js";

describe("parseImportQuantity", () => {
  it("accepts valid integer string", () => {
    expect(parseImportQuantity("10", 1)).toBe(10);
  });
  it("accepts finite whole number", () => {
    expect(parseImportQuantity(5, 1)).toBe(5);
  });
  it("rejects decimal number type", () => {
    expect(() => parseImportQuantity(1.5, 1)).toThrow(/whole number/);
  });
  it("rejects non-digit string", () => {
    expect(() => parseImportQuantity("1a", 1)).toThrow();
  });
  it("rejects negative numeric", () => {
    expect(() => parseImportQuantity(-1, 1)).toThrow(/invalid/);
  });
});

describe("parseImportMoneyPositive", () => {
  it("parses RM prefix", () => {
    expect(parseImportMoneyPositive("RM 12.50", 1, "Unit price")).toBeCloseTo(12.5);
  });
  it("rejects zero", () => {
    expect(() => parseImportMoneyPositive("RM 0", 1, "Unit price")).toThrow(/greater than 0/);
  });
  it("rejects negative", () => {
    expect(() => parseImportMoneyPositive("-5", 1, "Unit price")).toThrow(/negative/);
  });
});

describe("normalizeImportRow", () => {
  it("normalizes valid row", () => {
    const r = normalizeImportRow(["Shirt", "2", "Top", "RM 10", "RM 20"], 0);
    expect(r[0]).toBe("Shirt");
    expect(r[1]).toBe("2");
    expect(r[2]).toBe("Top");
    expect(r[3]).toBe("RM 10.00");
    expect(r[4]).toBe("RM 20.00");
  });
  it("throws on short row", () => {
    expect(() => normalizeImportRow(["a"], 0)).toThrow(/missing required columns/);
  });
});

describe("tryNormalizeImportRow", () => {
  it("returns ok false with message on bad row", () => {
    const res = tryNormalizeImportRow(["", "1", "", "RM 1", "RM 1"], 0);
    expect(res.ok).toBe(false);
    expect(res.msg).toBeDefined();
  });
});