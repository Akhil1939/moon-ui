import * as XLSX from 'xlsx';

export class TableExportUtil {
  static exportTableToExcel(
    tableId: string,
    name: string,
    excludeColumns: string[] = []
  ) {
    let { sheetName, fileName } = this.getFileName(name);
    let targetTableElm = document.getElementById(tableId)!;

    // Convert table to array of objects
    let data = this.tableToArrayOfObjects(targetTableElm);
    // Filter out the unwanted columns
    let filteredData = this.filterColumns(data, excludeColumns);

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(filteredData);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  static exportArrayToExcel(
    arr: any[],
    name: string,
    selectedColumns: string[] = [],
    headers: { [key: string]: string } = {}
  ) {
    let { sheetName, fileName } = this.getFileName(name);
  
    // Select only the specified columns and maintain the order
    let selectedData = arr.map(item => {
      let newItem :{ [key: string]: any } = {};
      selectedColumns.forEach(col => {
        newItem[headers[col] || col] = item[col]; // Use custom header if provided, otherwise use original column name
      });
      return newItem;
    });
  
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(selectedData);
    
    // If headers are provided, add them as the first row
    if (Object.keys(headers).length > 0) {
      let headerRow:{ [key: string]: any }= {};
      selectedColumns.forEach(col => {
        headerRow[headers[col] || col] = headers[col] || col;
      });
      let finalData = [headerRow, ...selectedData];
      ws = XLSX.utils.json_to_sheet(finalData, { skipHeader: true });
    }
  
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  private static tableToArrayOfObjects(
    table: HTMLElement
  ): { [key: string]: string }[] {
    let data: { [key: string]: string }[] = [];
    let rows = table.getElementsByTagName('tr');
    let headers: string[] = [];
    for (let i = 0; i < rows[0].cells.length; i++) {
      headers[i] = rows[0].cells[i].innerText.toLowerCase().replace(/ /gi, '');
    }
    for (let i = 1; i < rows.length; i++) {
      let tableRow = rows[i];
      let rowData: { [key: string]: string } = {};
      for (let j = 0; j < tableRow.cells.length; j++) {
        rowData[headers[j]] = tableRow.cells[j].innerText;
      }
      data.push(rowData);
    }
    return data;
  }

  private static filterColumns(data: any[], excludeColumns: string[]) {
    return data.map((row) => {
      let filteredRow = { ...row };
      excludeColumns.forEach((col) => delete filteredRow[col]);
      return filteredRow;
    });
  }

  private static getFileName(name: string) {
    let timeSpan = new Date().toISOString();
    let sheetName = name || 'ExportResult';
    // let fileName = `${sheetName}-${timeSpan}`; // if timeSpan required
    let fileName = `${sheetName}`;
    return {
      sheetName,
      fileName,
    };
  }
}
