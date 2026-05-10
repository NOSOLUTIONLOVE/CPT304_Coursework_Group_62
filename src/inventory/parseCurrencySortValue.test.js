import { describe, expect, it } from 'vitest';
import { parseCurrencySortValue } from './parseCurrencySortValue.js';

describe('parseCurrencySortValue', () => {
    it('parses RM prefix and commas', () => {
        expect(parseCurrencySortValue('RM 129.00')).toBe(129);
        expect(parseCurrencySortValue('RM 1,234.50')).toBe(1234.5);
    });

    it('handles empty and non-numeric', () => {
        expect(parseCurrencySortValue(null)).toBe(0);
        expect(parseCurrencySortValue('')).toBe(0);
        expect(parseCurrencySortValue('abc')).toBe(0);
    });
});
