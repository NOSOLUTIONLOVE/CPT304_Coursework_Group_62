/**
 * Extracted from app/index_final.html — DataTables numeric sort for RM-prefixed strings (P1-4).
 */
export function parseCurrencySortValue(raw) {
    const s = String(raw != null ? raw : '')
        .replace(/^RM\s*/i, '')
        .replace(/,/g, '')
        .trim();
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : 0;
}
