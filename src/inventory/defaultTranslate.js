import { formatMessage } from './formatMessage.js';
import { INVENTORY_MESSAGES_EN } from './messages-en.js';

/** Default English `t(key, params)` compatible with index_final.html */
export function defaultT(key, params) {
    const template = INVENTORY_MESSAGES_EN[key] ?? key;
    return formatMessage(template, params);
}
