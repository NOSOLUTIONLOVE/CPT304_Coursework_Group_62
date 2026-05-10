import { describe, it, expect } from "vitest";
import { defaultT } from "../src/inventory/defaultTranslate.js";

describe("defaultT", () => {
  it("returns formatted quantity invalid message", () => {
    expect(defaultT("errQuantityInvalid", { row: 1 })).toBe("Row 1: Quantity is invalid or too large.");
  });
  it("returns formatted price negative message", () => {
    expect(defaultT("errPriceNegative", { row: 2, field: "Unit price" })).toBe("Row 2: Unit price cannot be negative.");
  });
  it("returns key itself when key not found", () => {
    expect(defaultT("unknownKey", {})).toBe("unknownKey");
  });
});