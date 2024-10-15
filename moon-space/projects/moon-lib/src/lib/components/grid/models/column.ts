import { SelectionModel } from '@angular/cdk/collections';
import { QueryList } from '@angular/core';
import {
  MatHeaderCellDef,
  MatCellDef,
  MatColumnDef,
} from '@angular/material/table';
import { BodyCellComponent } from '../components/cells/body-cell/body-cell.component';
import { HeaderCellComponent } from '../components/cells/header-cell/header-cell.component';
import { MatCheckboxChange } from '@angular/material/checkbox';

export interface ColumnReference {
  sccHeaderCell: HeaderCellComponent;
  sccBodyCell: BodyCellComponent;
  matHeaderCellDef: MatHeaderCellDef;
  matCellDef: MatCellDef;
  selection: SelectionModel<any>;
}
export interface CommonColumnDefinition {
  matColumnDef: QueryList<MatColumnDef>;
  columnReference: ColumnReference;
}

type ColumnTypes =
  | 'action'
  | 'number'
  | 'string'
  | `checkbox`
  | `html`
  | `serialNo`
  | 'select'
  | 'dropdown'
  | 'autocomplete'
  | 'expand'
  | 'radio'
  | 'date' 
  | 'textarea';
/**
 * @description Basic defination of the column
 */
export interface BaseColumnOptions<T = any, D = any> {
  /**
   * @description to get element by id
   */
  id?: string;
  /**
   * @description To display column name
   */
  label: string;
  /**
   * @description To bind the column value
   */
  property: string;
  /**
   * @description Type of column
   * @example 'action' | 'number' | 'string' | `checkbox` | `html` | `serialNo` | 'select' | 'date' | 'dropdown'
   */
  type?: ColumnTypes;
  /*
  classes for cells of that column
  */
  classes?:string[];
  /*
   * @description To show action icons instead of value
   */
  
  actions?: ActionOptions<D>[];
  /**
   * @description To show list inside cell as per options, type
   */
  options?: T;
  /**
   * @description To use existing library components like input, select etc
   */
  useLibComponent?: true | false;
  /**
   * @description To set column with sortable options
   */
  isSortable?: boolean;
  /*
  width for that column
  */
  width?:string;
  /**
   * @description To set value of column by conditionally
   * @param row
   * @returns
   */

  valueGetter?: (row: T) => any;
  /**
   * @description To edit the column
   * @param row
   * @param rowIndex
   * @returns
   */
  isEditable?: (row: T, rowIndex: number) => boolean;
  /**
   * @description To hide the column value
   * @param row
   * @returns
   */
  isVisibleCellValue?: (row: T) => boolean;
  /**
   * @description To hide the column
   * @param row
   * @returns
   */
  isVisible?: (row: T) => boolean;
  /**
   * @description Click event on cell
   * @param row
   * @returns
   */
  click?: (row: T) => void;

   /**
   * @description get list of class for cell
   * @param row
   * @returns array of string
   */
  classGetter?(row:T):string[]

  /**
  * @description get list of style for cell
  * @param row
  * @returns array of string
  */
  getStyle?(row: T): object

   /**
   * @description tooltip for cell
   */
  toolTipText?:string;
     /**
   * @description get tooltip text using function
   * @param row
   * @returns string
   */
  toolTipGetter?(row:T):string;
   /**
   * @description for select column export the selected rows (select column)
   * @param rows
   * @returns 
   */
  selectionChange?(rows:any):void;
  /**
   * ColSpan for column
   */
  colSpan?:number;
  /**
   * In which level of row this column is appear
   */
  level?:0|1|2|3;
  /**
   * @description callback function for check if row is selected (select column)
   * @param row 
   */
  isSelected?(row:any):boolean;
  /**
   * @description callback function for check if row is selected (checkbox column)
   * @param row
   */
  onCheckChange?(event:MatCheckboxChange, element:any, index:number):void;
}

/**
 * @description To show action icons, button or any component on last column
 */
export interface ActionOptions<D = any, O = any> {
  /**
   * @requires
   * @description Type of actions
   * @example  `icon` | `button` | `menu`
   */
  type: `icon` | `button` | `menu`;
  /**
   * @requires
   * @description To options as per type
   * @remarks we can provide either mat icon or a image path
   * @type ButtonOptions | IconOptions | MenuOptions
   */
  options: O ;
  /**
   * @description Click event on action
   * @returns void
   */
  click?: (event:any) => void;
  /**
   * @description Click event on action
   * @returns void
   */
  hover?: () => void;
  /**
   * @description Click event on action
   * @returns boolean
   */
  isVisible?: (row: D) => boolean;
  /**
   * @description Click event on action
   * @returns boolean
   */
  isDisabled?: (row: D) => boolean;
}
