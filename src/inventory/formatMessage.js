/**
 * Same substitution behavior as `t(key, params)` in index_final.html.
 * @param {string} template
 * @param {Record<string, string | number>|undefined} params
 */
export function formatMessage(template, params) {
    let text = template;
    if (params) {
        for (const k of Object.keys(params)) {
            text = text.replace(new RegExp('\\{' + k + '\\}', 'g'), String(params[k]));
        }
    }
    return text;
}
