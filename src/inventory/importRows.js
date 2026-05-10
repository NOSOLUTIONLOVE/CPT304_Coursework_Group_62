import { defaultT } from './defaultTranslate.js';

/**
 * Extracted from app/index_final.html — import row validation (P1-3).
 * Optional `t` matches page i18n when wiring later.
 */

export function parseImportQuantity(raw, rowNum, t = defaultT) {
    if (typeof raw === 'number' && Number.isFinite(raw)) {
        if (raw < 0 || raw > 1000000000) {
            throw new Error(t('errQuantityInvalid', { row: rowNum }));
        }
        if (Math.floor(raw) !== raw) {
            throw new Error(t('errQuantityWhole', { row: rowNum }));
        }
        return Math.floor(raw);
    }
    const s = String(raw != null ? raw : '').trim();
    if (!/^\d+$/.test(s)) {
        throw new Error(t('errQuantityDigits', { row: rowNum }));
    }
    const n = parseInt(s, 10);
    if (!Number.isFinite(n) || n > 1000000000) {
        throw new Error(t('errQuantityInvalid', { row: rowNum }));
    }
    return n;
}

export function parseImportMoneyPositive(raw, rowNum, fieldLabel, t = defaultT) {
    const orig = String(raw != null ? raw : '').trim();
    if (orig.indexOf('-') >= 0 || orig.indexOf('\u2212') >= 0) {
        throw new Error(t('errPriceNegative', { row: rowNum, field: fieldLabel }));
    }
    const s = orig.replace(/^RM\s*/i, '').replace(/,/g, '').trim();
    if (!/^\d+(\.\d+)?$/.test(s)) {
        throw new Error(t('errPriceFormat', { row: rowNum, field: fieldLabel }));
    }
    const n = parseFloat(s);
    if (!Number.isFinite(n) || n <= 0) {
        throw new Error(t('errPriceZero', { row: rowNum, field: fieldLabel }));
    }
    return n;
}

export function normalizeImportRow(row, index, t = defaultT) {
    if (!Array.isArray(row)) {
        throw new Error(t('errRowNotArray', { row: index + 1 }));
    }
    if (row.length < 5) {
        throw new Error(t('errRowMissingCols', { row: index + 1 }));
    }

    const itemName = row[0] ? row[0].toString().trim().substring(0, 100) : '';
    const type = row[2] ? row[2].toString().trim().substring(0, 50) : '';

    if (itemName === '') {
        throw new Error(t('errItemNameEmpty', { row: index + 1 }));
    }
    if (type === '') {
        throw new Error(t('errTypeEmpty', { row: index + 1 }));
    }

    const rowNum = index + 1;
    const quantity = parseImportQuantity(row[1], rowNum, t);
    const unit = parseImportMoneyPositive(row[3], rowNum, 'Unit price', t);
    const expectedTotal = Math.round(quantity * unit * 100) / 100;

    return [
        itemName,
        quantity.toFixed(0),
        type,
        `RM ${unit.toFixed(2)}`,
        `RM ${expectedTotal.toFixed(2)}`,
    ];
}

export function tryNormalizeImportRow(row, index, t = defaultT) {
    try {
        return { ok: true, row: normalizeImportRow(row, index, t) };
    } catch (e) {
        return { ok: false, msg: e.message || String(e) };
    }
}
