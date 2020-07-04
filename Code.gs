/**
*
* If the sheet has a row with the header row text in it, delete that row.
*
* References
*
* https://stackoverflow.com/questions/44312924/filter-array-of-objects-whose-any-properties-contains-a-value
* https://developers.google.com/apps-script/reference/spreadsheet/range#deleteCells(Dimension)
* https://www.reddit.com/r/googlesheets/comments/hk83di/import_csv_without_top_row/
*
*/

function deleteHeaderRows() {
  
  //  Declare variables
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();
  var range = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn());  // Row parameter is set to 2 to leave the very first header row alone
  var rangeValues = range.getDisplayValues();    
  var headerRowContains = "column";         // Change this to whatever text your header row always contains and your important data will never have
  
  //  Create new array of sheet values with any row including our header text removed
  var rangeValuesWithoutHeaders =  rangeValues.filter((data) =>  JSON.stringify(data).toLowerCase().indexOf(headerRowContains.toLowerCase()) === -1);
  
  //  Remove current range
  range.deleteCells(SpreadsheetApp.Dimension.ROWS);
  
  //  Set new array of "header row"-less values to the same sheet
  sheet.getRange(range.getRow(), range.getColumn(), rangeValuesWithoutHeaders.length, rangeValuesWithoutHeaders[0].length).setValues(rangeValuesWithoutHeaders);
  SpreadsheetApp.flush();
  
  //  Indicate how many header rows were removed
  SpreadsheetApp.getUi().alert("Removed " + (rangeValues.length - rangeValuesWithoutHeaders.length) + " header rows from data");
}
