import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatIconModule,
    MatChipsModule,
    ErrorMessageComponent
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatIconModule,
    MatChipsModule,
    ErrorMessageComponent
  ]
})
export class SccDropdownModule { }
