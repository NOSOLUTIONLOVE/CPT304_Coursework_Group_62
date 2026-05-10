import { defaultT } from './defaultTranslate.js';

/**
 * Pure part of `displayContents` in index_final.html — JSON shape + row count limits (P1-3).
 * @param {string} contents — file text
 * @param {(key: string, params?: Record<string, string | number>) => string} [t]
 */
export function parseDataRowsFromJsonText(contents, t = defaultT) {
    const parsed = JSON.parse(contents);

    let dataRows = null;
    if (parsed && Array.isArray(parsed.body)) {
        dataRows = parsed.body;
    } else if (Array.isArray(parsed)) {
        dataRows = parsed;
    } else {
        throw new Error(t('errUnrecognizedJSON'));
    }

    if (!dataRows || dataRows.length === 0) {
        throw new Error(t('errNoData'));
    }
    if (dataRows.length > 5000) {
        throw new Error(t('errFileTooLarge'));
    }

    return dataRows;
}
