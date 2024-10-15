import { MatTableDataSource } from '@angular/material/table';
import { BaseColumnOptions } from './column';
import { GridHeaderOptions } from './grid-header';
import { Sort } from '@angular/material/sort';
import { PaginatorOptions } from './paginator-options';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { RefreshOption } from './refresh';
import { RowClassParameters, RowStyle } from './row';
import { CommonMatTableDataSource } from './grid-data';

/**
 * @description To provide grid definition
 * @param column
 * @description We have provide column definition as per BaseColumnOptions interface
 * @param data
 * @description To provide array of object where column will be bind with values
 * @param rowSelection
 * @description To select row as 'single' or 'multiple'
 */
export interface CommonGridOptions<D = any> {
  id?: string;
  classes?: string[];
  columns: BaseColumnOptions<D>[];
  data: any[];
  rowSelection?: 'single' | 'multiple';
  isFullRowEditable?: boolean;
  header?: GridHeaderOptions | undefined;
  paginatorOptions?: PaginatorOptions | undefined;
  /**
   * @description It is useful to reflect or refresh grid content
   * @type Observable where we can enable flags which are a defined function
   * @example refresh$.next({commonGrid: { setDisplayedItems: true }})
   * `setDisplayItems` is defined function in common-grid
   */
  refresh$?: BehaviorSubject<any> | undefined;
  /**
   * @description The style properties to apply to all rows. Set to an object of key (style names) and values (style values).
   */
  rowStyle?: RowStyle | undefined;

  /**
   * @description Callback version of property rowStyle to set style for each row individually. Function should return an object of CSS values or undefined for no styles
   * @param params RowClassParameters<D>
   * @returns 
   */
  getRowStyle?: (params: RowClassParameters<D>) => RowStyle | undefined;
   /**
 * @description Handles the change in sort order for the table data.
 * This function is called when the sort order of the table changes.
 * 
 * @param $event - The sort event containing information about the active sort and direction.
 * @returns A new instance of `CommonMatTableDataSource<any>` with the sorted data.
 */
sortChange?($event: Sort): void;

/**
 * @description Updates the data for a specific row in the table.
 * This function is called when there is a change in the row data that needs to be updated.
 * 
 * @param newRow - The new row data that contains the updated values.
 * @param oldRow - (Optional) The old row data before the update. Useful for comparison or rollback.
 * @param field - (Optional) The specific field in the row that was updated.
 */
updateData?(newRow: any, oldRow?: any, field?: string): void;

/**
 * Name of uniquely identifying the row in the table
 */
uniqueProperty?:string
}

export class CommonGridOptions<D> implements CommonGridOptions<D> {
  columns: BaseColumnOptions<D>[] = [];
  data: any[] = [];
  refresh$? = new BehaviorSubject<any>({} as any);
  paginatorOptions? = {} as PaginatorOptions;
  /**
   * To use multiple row set it to true
   */
  isMultipleRow?: boolean; 
  selected?:any[]=[];
}