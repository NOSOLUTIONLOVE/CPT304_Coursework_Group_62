/**
 * English validation strings — mirrors `i18n.en` in app/index_final.html (subset used by import logic).
 */
export const INVENTORY_MESSAGES_EN = {
    errQuantityInvalid: 'Row {row}: Quantity is invalid or too large.',
    errQuantityWhole: 'Row {row}: Quantity must be a whole number.',
    errQuantityDigits:
        'Row {row}: Quantity must be a whole number (digits only, no letters or symbols).',
    errPriceNegative: 'Row {row}: {field} cannot be negative.',
    errPriceFormat: 'Row {row}: {field} must be a positive amount like RM 129.00.',
    errPriceZero: 'Row {row}: {field} must be greater than 0.',
    errRowNotArray: 'Row {row} is not a valid array.',
    errRowMissingCols: 'Row {row} is missing required columns.',
    errItemNameEmpty: 'Row {row}: Item Name cannot be empty.',
    errTypeEmpty: 'Row {row}: Type cannot be empty.',
    errUnrecognizedJSON: 'Unrecognized JSON structure.',
    errNoData: 'The file contains no data.',
    errFileTooLarge: 'File too large. Maximum 5000 rows allowed.',
};
