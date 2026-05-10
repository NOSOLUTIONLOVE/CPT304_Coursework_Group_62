import { formatMessage } from './formatMessage.js';

var messages = {
  errQuantityInvalid: "Row {row}: Quantity is invalid or too large.",
  errQuantityWhole: "Row {row}: Quantity must be a whole number.",
  errQuantityDigits: "Row {row}: Quantity must be a whole number (digits only, no letters or symbols).",
  errPriceNegative: "Row {row}: {field} cannot be negative.",
  errPriceFormat: "Row {row}: {field} must be a positive amount like RM 129.00.",
  errPriceZero: "Row {row}: {field} must be greater than 0.",
};

export function defaultT(key, params) {
  var template = messages[key] || key;
  return formatMessage(template, params);
}