# UNIQLO-Style Web Inventory Management System
 
A pure front-end inventory management page for the **CPT304** coursework project. Manage item names, quantities, categories, unit prices and total prices directly in the browser, styled with UNIQLO's brand colours and UI language. No build tools or back-end required — just open the HTML file.

 
## Features
 
| Feature | Description |
|---------|-------------|
| **CRUD** | Add, edit, and delete rows inline; supports search and numeric sorting on price columns (unit price and total price sort by value). |
| **Import** | Load inventory via **Load Data** from a JSON file. Accepts both `{"header":...,"body":[...]}` and a **2-D array** as the top-level structure. Rows that fail validation trigger an **Import Issues** modal — choose **Skip** to import only valid rows or **Cancel** to abort. |
| **Export** | **Save Data** exports the current table as `DB.txt` (DataTables JSON export). |
| **Local Persistence** | Uses `localStorage` (key: `inventoryData`) to automatically save the current table and restore it after a page refresh. |
| **Bilingual UI** | English / Simplified Chinese toggle (switcher in the title bar; preference saved under `inventory-lang`). |
| **Select & Bulk Actions** | Floating **SELECT** button (bottom-right) enters selection mode: check rows, adjust **Buy Qty**; **DELETE SELECTED** deducts the specified quantity or removes the row; **CONFIRM ORDER** simulates a purchase, deducts stock, and shows a **Transaction Receipt**. |
| **Compliance & Privacy** | A cookie consent banner is shown on first visit (preference saved under `cookie-consent`); the footer links to [`privacy.html`](privacy.html). |

 
### Import Constraints
 
- Maximum **5,000 rows** per import.
- Quantity must be a non-negative integer; unit price and total price must be positive **RM**-formatted amounts; item name and category must not be empty. Total price is recalculated on import as `quantity × unit price` to ensure consistency.

<br>

## Tech Stack
 
- **Bootstrap 5** (layout and modals)
- **jQuery**
- **DataTables** (table, Buttons export, `$.fn.dataTable.fileSave`)
- **Font Awesome** (icons)
- Fonts: **Nunito**, **Raleway** 
> `assets/js/chart.min.js` is included in the repository but not currently referenced by any page; it is available for future chart extensions.

<br>
 
## Code Structure
- [index.html](https://github.com/julianganjs/inventory-management-system/blob/main/index.html): The main code for the website.
- [assets](https://github.com/julianganjs/inventory-management-system/tree/main/assets): Contains all the styles, libraries, fonts and frameworks needed for the website to work and look properly.
- [DB.txt](https://github.com/julianganjs/inventory-management-system/blob/main/DB.txt): An existing database file in JSON format to be imported into the inventory system.
- [privacy.html](https://github.com/julianganjs/inventory-management-system/blob/main/privacy.html): Privacy Policy page.
 
The UI also references `assets/images/uniqlo_logo.png` and `assets/images/empty.gif`. If these files are missing locally, please add resources with matching names or update the paths in `index.html` accordingly.

<br>
 
## Getting Started
 
1. Clone or extract the project into a single local folder.
2. Open `index.html` in a modern browser (Chrome / Edge / Firefox) **directly**, or serve it via any static file server (e.g. `npx serve` or VS Code Live Server) — recommended for consistent behaviour.
3. When the table is empty: click **New Data** or **Load Data**. Once data is loaded you can **Add New Item**, edit, delete, or **Save Data** to export.


<br>
 
## Browser & Storage Notes
 
- Functionality depends on **localStorage**. If the browser has strict third-party cookie/storage restrictions or is in a very restricted private-browsing mode, persistence and language settings may not work.
- Opening via `file://` works in most browsers for same-directory scripts and `localStorage`; if you encounter issues, serve the project over a local HTTP server instead.


<br>

## Four specific deficiencies

Below is a concise overview of the four high-severity defects selected by our group: what each issue is and its impact.

### 1. Duplicate binding on delete confirmation button 

| Item | Description |
|------|-------------|
| **Issue** | In the old implementation, each click on the table delete icon bound another click handler on `#delete_button`, stacking multiple handlers on the same button. |
| **Impact** | After the user opens the delete modal several times, a single click on “Delete” may fire `delete_Row()` multiple times, deleting multiple rows or leaving the table in an inconsistent state. |


### 2. Form submit handlers use global `event` 

| Item | Description |
|------|-------------|
| **Issue** | The `submit` callbacks for `#edit_data` and `#add_data` use the global variable `event` directly instead of the event object passed into the callback. |
| **Impact** | `event` is not guaranteed to exist in every environment; strict mode, some browsers, or modular setups may throw `ReferenceError: event is not defined`, so add/update inventory operations fail. |


### 3. LOAD DATA parsing relies on string splitting 

| Item | Description |
|------|-------------|
| **Issue** | `displayContents` slices the text with patterns such as `contents.split('"body":')[1].split('}')[0]` before `JSON.parse`, tightly coupling parsing to a fixed string layout. |
| **Impact** | Small changes to the file format can cause `TypeError` or parse failures; without clear errors, load failures are easy to miss, and in severe cases the script may stop; a failed parse can also corrupt the previous data state. |


### 4. Price columns sorted as strings 

| Item | Description |
|------|-------------|
| **Issue** | Unit Price and Total Price are stored as strings with an `"RM "` prefix; DataTables uses default string sorting instead of numeric sorting. |
| **Impact** | Sorting by the price column header does not reflect true monetary order (e.g. RM 15.10 may appear after RM 140.00). Users may not notice, which misleads price comparisons and inventory valuation decisions. |



<br>

## Examples (En)
- ### Privacy Page
  <img width="1259" height="622" alt="4" src="https://github.com/user-attachments/assets/fb0f865a-d3fa-412b-9911-10a1025cc042" />

- ### Main Screen (without Data)
  <img width="1260" height="620" alt="mainscreen" src="https://github.com/user-attachments/assets/5376649d-3155-4a1a-8cd6-e75f9fbcb9f6" />
  
- ### Main Screen (with a data file with some errors)
<img width="1260" height="620" alt="2" src="https://github.com/user-attachments/assets/abb8ef3b-4655-4667-bdbf-577f4609d2eb" />

- ### Main Screen (skip errors and load data)
<img width="1260" height="620" alt="3" src="https://github.com/user-attachments/assets/e8abff1d-c314-41ab-8275-9e3f81a1daed" />

- ### Main Screen (add item)
<img width="1277" height="620" alt="5" src="https://github.com/user-attachments/assets/8d86b1ba-9967-4d66-826a-15779fac971b" />

- ### Main Screen (add successfully)
<img width="1275" height="621" alt="6" src="https://github.com/user-attachments/assets/8fb418df-e4d0-4e6c-b417-3eab313a3f10" />

- ### Main Screen (delete confirmation)
  <img width="1279" height="622" alt="7" src="https://github.com/user-attachments/assets/05c60252-d619-4fdd-a48c-0dde38f27aec" />

- ### Main Screen (delete by quantity)
<img width="1278" height="623" alt="8" src="https://github.com/user-attachments/assets/2c7fb804-a39e-421b-ab87-32c75001d6cf" />

- ### Main Screen (order bill)
<img width="1278" height="623" alt="9" src="https://github.com/user-attachments/assets/622d1843-9d17-4fc3-aa85-15b8a35ab37a" />

- ### Main Screen (error notice)
<img width="1278" height="620" alt="10" src="https://github.com/user-attachments/assets/857997df-790f-4fa5-8a6a-41a1cc6c29cf" />

<br>

## Licence
 
This project is licensed under the MIT License.
 
---
 
*Course context: CPT304 Coursework — Group 62.*
