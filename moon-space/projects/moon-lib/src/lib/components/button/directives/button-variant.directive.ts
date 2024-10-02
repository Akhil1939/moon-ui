import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[libButtonVariant]',
  standalone: true,
})
export class ButtonVariantDirective {
  @Input() buttonVariant: string = 'button'; // Default to 'button' if not provided

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.setButtonAttributes();
  }

  private setButtonAttributes() {
    const buttonElement = this.elementRef.nativeElement;

    // Remove existing mat button attributes
    buttonElement.removeAttribute('mat-button');

    // Apply appropriate mat button attribute based on the variant
    switch (this.buttonVariant) {
      case 'raised':
        this.renderer.setAttribute(buttonElement, 'mat-raised-button', '');
        this.renderer.addClass(buttonElement, 'mdc-button--raised');
        this.renderer.addClass(buttonElement, 'mat-mdc-raised-button');
        break;
      case 'stroked':
        this.renderer.setAttribute(buttonElement, 'mat-stroked-button', '');
        this.renderer.addClass(buttonElement, 'mdc-button--outlined');
        this.renderer.addClass(buttonElement, 'mat-mdc-outlined-button');
        break;
      case 'flat':
        this.renderer.setAttribute(buttonElement, 'mat-flat-button', '');
        this.renderer.addClass(buttonElement, 'mdc-button--unelevated');
        this.renderer.addClass(buttonElement, 'mat-mdc-unelevated-button');
        break;
      case 'icon':
        this.renderer.setAttribute(buttonElement, 'mat-icon-button', '');
        this.renderer.removeClass(buttonElement, 'mdc-button');
        this.renderer.removeClass(buttonElement, 'mat-mdc-button');
        this.renderer.addClass(buttonElement, 'mdc-icon-button');
        this.renderer.addClass(buttonElement, 'mat-mdc-icon-button');
        break;
      case 'fab':
        this.renderer.setAttribute(buttonElement, 'mat-fab', '');
        this.renderer.removeClass(buttonElement, 'mdc-button');
        this.renderer.removeClass(buttonElement, 'mat-mdc-button');
        this.renderer.removeClass(buttonElement, 'mat-mdc-button-base');
        this.renderer.addClass(buttonElement, 'mdc-fab');
        this.renderer.addClass(buttonElement, 'mat-mdc-fab');
        this.renderer.addClass(buttonElement, 'mat-mdc-fab-base');
        break;
      case 'mini-fab':
        this.renderer.setAttribute(buttonElement, 'mat-mini-fab', '');
        this.renderer.addClass(buttonElement, 'mdc-fab');
        this.renderer.addClass(buttonElement, 'mat-mdc-mini-fab');
        this.renderer.addClass(buttonElement, 'mdc-fab--mini');
        break;
      default:
        this.renderer.setAttribute(buttonElement, 'mat-button', ''); // Default to mat-button
        break;
    }
  }
}
