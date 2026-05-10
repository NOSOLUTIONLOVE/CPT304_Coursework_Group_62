export function parseDataRowsFromJsonText(contents) {
  let parsed;
  try {
    parsed = JSON.parse(contents);
  } catch {
    throw new Error("Invalid JSON.");
  }
  let dataRows = null;
  if (parsed && Array.isArray(parsed.body)) {
    dataRows = parsed.body;
  } else if (Array.isArray(parsed)) {
    dataRows = parsed;
  } else {
    throw new Error("Unrecognized JSON structure.");
  }
  if (!dataRows || dataRows.length === 0) {
    throw new Error("The file contains no data.");
  }
  if (dataRows.length > 5000) {
    throw new Error("File too large. Maximum 5000 rows allowed.");
  }
  return dataRows;
}