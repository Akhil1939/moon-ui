import { BehaviorSubject } from "rxjs";
import { FormBaseOptions, TextValueOptionConfig } from "../../../shared/models";
import { DropDownFeature } from "./dropdown-feature";


/**
 * Configuration for a dropdown/select component.
 */
export interface DropdownOptions extends FormBaseOptions {
  /**
   * Options to be displayed in the dropdown.
   */
  data: TextValueOptionConfig[];

  /**
   * Additional features for the dropdown.
   */
  features?: DropDownFeature;
  /**
  * Flag for overriding callback functions.
   */
  isOverrideCallbacks?:boolean;
  /**
   * @description To bind value from the option selection.
   * @default bind by value
   */

  bind?: (item: any) => any;

  /**
   * Function to be called when the selection changes.
   * @param event Event object.
   */
  selectionChange?(event: any, row?: any): void;

  /**
   * subject to be called when the data change for option.
   */
  changeOptions$?: BehaviorSubject<TextValueOptionConfig[]> | undefined
}

