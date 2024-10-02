import { TooltipPosition } from '@angular/material/tooltip';
import { ComponentBaseOptions } from '../../../shared/models/common-options';
import { BadgeOptions } from './badge-options';
import { ThemePalette } from '@angular/material/core';
/**
 * Configuration metadata for a button component.
 *
 * Required Fields:
 * - buttonVariant: Variant of the button.
 * - click: Callback function to be executed when the button is clicked.
 *
 * Optional Fields:
 * - label: Label text for the button.
 * - matIcon: Material icon name for the button.
 * - iconUrl: Image URL for the button.
 * - altText: Alternative text for the button icon.
 * - matColor: Color of the button.
 * - color: Custom text color of the button (color code).
 * - backgroundColor: Custom background color of the button (color code).
 * - disabled: Specifies whether the button is disabled or not.
 * - tooltipText: Tooltip text to be displayed on hover.
 * - tooltipPosition: Position of the tooltip relative to the button.
 * - badgeConfig: Configuration options for the badge.
 * - isCallbackFnOverride: Callback function flag for enabling click event emitting.
 * - blur: Callback function to be executed when the button loses focus.
 * - focus: Callback function to be executed when the button gains focus.
 * - hover: Callback function to be executed when the button is hovered over.
 */
export interface ButtonOptions extends ComponentBaseOptions {
  /**
   * Label text for the button.
   * This is what will be displayed on the button.
   */
  label?: string;

  /**
   * Material icon name for the button.
   * This is the name of the icon from the Material Icons library.
   */
  matIcon?: string;

  /**
   * Image URL for the button.
   * This URL points to an image that will be used as the button's icon.
   */
  iconUrl?: string;

  /**
   * Alternative text for the button icon.
   * This text will be used for accessibility purposes and when the image cannot be displayed.
   */
  altText?: string;

  /**
   * Variant of the button.
   * Specifies the visual style of the button.
   * - 'basic': Basic button.
   * - 'raised': Raised button.
   * - 'stroked': Stroked button.
   * - 'icon': Icon button.
   * - 'fab': Floating Action Button.
   * - 'mini-fab': Mini Floating Action Button.
   * - 'flat': Flat button.
   */
  buttonVariant:
    | 'basic'
    | 'raised'
    | 'stroked'
    | 'icon'
    | 'fab'
    | 'mini-fab'
    | 'flat';

  /**
   * Color of the button.
   * Specifies the color theme of the button.
   * - 'primary': Primary color.
   * - 'accent': Accent color.
   * - 'warn': Warning color.
   * - 'default': Default color.
   * (A corresponding CSS class will be added to the button, e.g., 'btn-primary').
   */
  matColor?: ThemePalette;

  /**
   * Specifies whether the button is disabled.
   * If true, the button will be unclickable and visually styled as disabled.
   */
  disabled?: boolean;

  /**
   * Tooltip text to be displayed on hover.
   * This text will be shown when the user hovers over the button.
   */
  tooltipText?: string;

  /**
   * Position of the tooltip relative to the button.
   * Specifies where the tooltip will appear in relation to the button.
   * - 'after': Tooltip appears after the button.
   * - 'before': Tooltip appears before the button.
   * - 'above': Tooltip appears above the button.
   * - 'below': Tooltip appears below the button.
   * - 'left': Tooltip appears to the left of the button.
   * - 'right': Tooltip appears to the right of the button.
   */
  tooltipPosition?: TooltipPosition;

  /**
   * Configuration options for the badge.
   * This object contains settings for displaying a badge on the button.
   */
  badgeConfig?: BadgeOptions;

  /**
   * Callback function flag for enabling click event emitting.
   * If true, this flag allows to override existing all callback functions
   */
  isCallbackFnOverride?: boolean;
  /**
     * To visible (hide/show) button
     * @param data 
     * @returns boolean
     */
  isVisible?: boolean | undefined;
  /**
   * Callback function to be executed when the button is clicked.
   * @param event The event representing the button click.
   * @param data Optional additional data related to the event.
   */
  click(event: MouseEvent, data?: any): void;

  /**
   * Callback function to be executed when the button loses focus.
   * @param event The event representing the button blur.
   */
  blur?(event: any): void;

  /**
   * Callback function to be executed when the button gains focus.
   * @param event The event representing the button focus.
   */
  focus?(event: any): void;

  /**
   * Callback function to be executed when the button is hovered over.
   * @param event The event representing the button hover.
   */
  hover?(event: any): void;
}
