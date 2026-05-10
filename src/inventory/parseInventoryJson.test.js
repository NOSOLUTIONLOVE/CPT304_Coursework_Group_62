import { describe, expect, it } from 'vitest';
import { parseDataRowsFromJsonText } from './parseInventoryJson.js';

describe('parseDataRowsFromJsonText', () => {
    it('reads body array', () => {
        const rows = [['a', 1, 't', 'RM 10', 'RM 10']];
        const text = JSON.stringify({ body: rows });
        expect(parseDataRowsFromJsonText(text)).toEqual(rows);
    });

    it('reads top-level array', () => {
        const rows = [['a', 1, 't', 'RM 10', 'RM 10']];
        expect(parseDataRowsFromJsonText(JSON.stringify(rows))).toEqual(rows);
    });

    it('throws on unrecognized shape', () => {
        expect(() => parseDataRowsFromJsonText(JSON.stringify({ foo: [] }))).toThrow(
            /Unrecognized JSON structure/,
        );
    });

    it('throws on empty data', () => {
        expect(() => parseDataRowsFromJsonText(JSON.stringify({ body: [] }))).toThrow(
            /no data/,
        );
    });

    it('throws when too many rows', () => {
        const big = new Array(5001).fill(['x', 1, 'y', 'RM 1', 'RM 1']);
        expect(() =>
            parseDataRowsFromJsonText(JSON.stringify({ body: big })),
        ).toThrow(/5000/);
    });

    it('allows exactly 5000 rows', () => {
        const rows = new Array(5000).fill(['x', 1, 'y', 'RM 1', 'RM 1']);
        expect(parseDataRowsFromJsonText(JSON.stringify({ body: rows })).length).toBe(5000);
    });

    it('propagates JSON syntax errors', () => {
        expect(() => parseDataRowsFromJsonText('not json')).toThrow(SyntaxError);
    });
});
