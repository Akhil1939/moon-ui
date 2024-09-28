import { ThemePalette } from "@angular/material/core";

/**
 * Configuration options for a base component.
 *
 * Required properties:
 * - id
 *
 * Optional properties:
 * - classes
 * - matColor
 */
export interface ComponentBaseOptions {
  /**
   * Unique identifier for the element.
   */
  id?: string;

  /**
   * Additional CSS classes for the element (optional).
   */
  classes?: string[];

  /**
   * Material color for the element (optional).
   * - 'primary': Primary color.
   * - 'accent': Accent color.
   * - 'warn': Warning color.
   * - 'default': Default color.
   */
  matColor?: ThemePalette;
}

export interface CallBackFnOptions<T = any> {
  [key: string]: T
}