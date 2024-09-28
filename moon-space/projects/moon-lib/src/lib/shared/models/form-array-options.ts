/**
 * Configuration options for a form array.
 *
 * Required properties:
 * - formArrayName
 * - arrayIndex
 */
export interface FormArrayOptions {
  /**
   * Name of the form array.
   */
  formArrayName: string;

  /**
   * Index of the array.
   */
  arrayIndex: number;
}
