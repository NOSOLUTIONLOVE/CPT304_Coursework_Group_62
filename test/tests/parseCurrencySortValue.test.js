import { describe, it, expect } from "vitest";
import { parseCurrencySortValue } from "../src/inventory/parseCurrencySortValue.js";

describe("parseCurrencySortValue", () => {
  it("parses RM prefix correctly", () => {
    expect(parseCurrencySortValue("RM 129.00")).toBeCloseTo(129);
  });
  it("parses value without RM prefix", () => {
    expect(parseCurrencySortValue("50.00")).toBeCloseTo(50);
  });
  it("parses value with comma", () => {
    expect(parseCurrencySortValue("RM 1,000.00")).toBeCloseTo(1000);
  });
  it("returns 0 for null", () => {
    expect(parseCurrencySortValue(null)).toBe(0);
  });
  it("returns 0 for empty string", () => {
    expect(parseCurrencySortValue("")).toBe(0);
  });
  it("returns 0 for non-numeric string", () => {
    expect(parseCurrencySortValue("abc")).toBe(0);
  });
});