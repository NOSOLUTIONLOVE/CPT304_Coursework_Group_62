import { describe, it, expect } from "vitest";
import { formatMessage } from "../src/inventory/formatMessage.js";

describe("formatMessage", () => {
  it("replaces single placeholder", () => {
    expect(formatMessage("Row {row}: error", { row: 1 })).toBe("Row 1: error");
  });
  it("replaces multiple placeholders", () => {
    expect(formatMessage("{field} at row {row}", { field: "Price", row: 2 })).toBe("Price at row 2");
  });
  it("returns template unchanged when no params", () => {
    expect(formatMessage("No placeholders")).toBe("No placeholders");
  });
  it("returns template unchanged when params is null", () => {
    expect(formatMessage("Hello {name}", null)).toBe("Hello {name}");
  });
});