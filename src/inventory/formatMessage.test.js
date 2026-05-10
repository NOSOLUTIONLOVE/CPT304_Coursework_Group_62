import { describe, expect, it } from 'vitest';
import { formatMessage } from './formatMessage.js';

describe('formatMessage', () => {
    it('replaces placeholders', () => {
        expect(formatMessage('Row {row}: ok', { row: 3 })).toBe('Row 3: ok');
    });
});
