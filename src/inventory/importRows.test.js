import { describe, expect, it } from 'vitest';
import {
    normalizeImportRow,
    parseImportMoneyPositive,
    parseImportQuantity,
    tryNormalizeImportRow,
} from './importRows.js';

describe('parseImportQuantity', () => {
    it('accepts whole numbers', () => {
        expect(parseImportQuantity(5, 1)).toBe(5);
        expect(parseImportQuantity('10', 1)).toBe(10);
    });

    it('rejects decimals as number type', () => {
        expect(() => parseImportQuantity(3.5, 1)).toThrow(/whole number/);
    });

    it('rejects bad strings', () => {
        expect(() => parseImportQuantity('12a', 1)).toThrow();
    });

    it('rejects out of range', () => {
        expect(() => parseImportQuantity(-1, 1)).toThrow(/invalid/);
        expect(() => parseImportQuantity(2000000000, 1)).toThrow(/invalid/);
    });

    it('rejects string quantity above max', () => {
        expect(() => parseImportQuantity('1000000001', 1)).toThrow(/invalid/);
    });
});

describe('parseImportMoneyPositive', () => {
    it('accepts RM amounts', () => {
        expect(parseImportMoneyPositive('RM 99.00', 1, 'Unit price')).toBe(99);
    });

    it('rejects negative', () => {
        expect(() => parseImportMoneyPositive('RM -1', 1, 'Unit price')).toThrow(/negative/);
    });

    it('rejects unicode minus', () => {
        expect(() => parseImportMoneyPositive(`RM 1\u22120`, 1, 'Unit price')).toThrow(/negative/);
    });

    it('rejects zero and bad format', () => {
        expect(() => parseImportMoneyPositive('RM 0.00', 1, 'Unit price')).toThrow();
        expect(() => parseImportMoneyPositive('free', 1, 'Unit price')).toThrow(/positive amount/);
    });
});

describe('normalizeImportRow', () => {
    it('normalizes valid row', () => {
        const out = normalizeImportRow(['Shirt', '2', 'Top', 'RM 25.00', 'RM 0'], 0);
        expect(out[0]).toBe('Shirt');
        expect(out[1]).toBe('2');
        expect(out[3]).toBe('RM 25.00');
        expect(out[4]).toBe('RM 50.00');
    });

    it('throws on empty name', () => {
        expect(() => normalizeImportRow(['', '1', 'T', 'RM 1', 'RM 1'], 0)).toThrow(/Item Name/);
    });

    it('throws on missing columns', () => {
        expect(() => normalizeImportRow(['a', 1, 't'], 0)).toThrow(/required columns/);
    });

    it('throws on empty type', () => {
        expect(() => normalizeImportRow(['Name', '1', '', 'RM 10', 'RM 10'], 0)).toThrow(/Type cannot be empty/);
    });
});

describe('tryNormalizeImportRow', () => {
    it('returns ok false with message on bad row', () => {
        const r = tryNormalizeImportRow(null, 0);
        expect(r.ok).toBe(false);
        expect(r.msg).toBeDefined();
    });
});
