import { MatFormFieldAppearance } from '@angular/material/form-field';
import { ComponentBaseOptions } from './common-options';

/**
 * id,
 * Classes,
 * appearance
 * disabled,
 * formCOntrolName,
 */
export interface FormBaseOptions extends ComponentBaseOptions {
  /**
   * Label for the field (optional).
   */
  label?: string;
  /**
   * Specifies whether the input field is required or not.
   */
  isFloatLabel?: boolean;
  /**
   * Appearance of the input field (optional).
   */
  appearance?: MatFormFieldAppearance;
  /**
   * Specifies whether the input field is disabled or not.
   */
  disabled?: boolean;

  /**
   * Name of the form control.
   */
  formControlName: string;

  //TODO  form Array
}
