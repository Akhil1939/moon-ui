import { Component, input } from '@angular/core';
import { ButtonOptions } from './models/button-options';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ButtonVariantDirective } from './directives/button-variant.directive';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgTemplateOutlet } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'moon-button',
  standalone: true,
  imports: [MatButton, ButtonVariantDirective, MatTooltipModule, NgTemplateOutlet, MatIcon],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  options = input.required<ButtonOptions>();
  isImageButton: boolean = false;
  isIconButton: boolean = false;

  constructor() {}

  ngOnInit() {
    this.#initialize();
  }

  #initialize(): void {
    this.isImageButton = !!this.options().iconUrl;
    if (!this.isImageButton) {
      this.isIconButton = !!this.options().matIcon;
    }
  }

  onBtnClick($event: any) {
    this.options().click($event);
  }

  onBtnBlur($event: any) {
    this.options().blur?.($event);
  }

  onBtnFocus($event: any) {
    this.options().focus?.($event);
  }

  onBtnHover($event: any) {
    this.options().hover?.($event);
  }
}
