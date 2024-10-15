/**
 * @description The style properties to apply to all rows. Set to an object of key (style names) and values (style values).
 * @example `color: red`
 */
export interface RowStyle extends Partial<CSSStyleDeclaration> {}
/**
 * @description Callback version of property `RowStyle` to set style for each row individually. Function should return an object of CSS values or undefined for no styles.
 * @param data - rowData
 * @param rowIndex
 */
export interface RowClassParameters<TData = any> {
  /**
   * @description The data associated with this row from rowData. Data is `undefined` for row groups.
   */
  data: TData | undefined;
  /**
   * @description The index of the row
   */
  rowIndex: number;
  /**
   * @description The level of the row
   */
  rowLevel?: 0 | 1 | 2 | 3;
}
