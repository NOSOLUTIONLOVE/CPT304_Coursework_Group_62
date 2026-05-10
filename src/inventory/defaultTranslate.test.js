import { describe, expect, it } from 'vitest';
import { defaultT } from './defaultTranslate.js';

describe('defaultT', () => {
    it('returns known key', () => {
        expect(defaultT('errNoData')).toBe('The file contains no data.');
    });

    it('returns key as text if unknown', () => {
        expect(defaultT('unknownKeyXYZ')).toBe('unknownKeyXYZ');
    });
});
