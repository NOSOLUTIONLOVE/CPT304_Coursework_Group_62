export function parseCurrencySortValue(raw) {
  var s = String(raw != null ? raw : '').replace(/^RM\s*/i, '').replace(/,/g, '').trim();
  var n = parseFloat(s);
  return isFinite(n) ? n : 0;
}