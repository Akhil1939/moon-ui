import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatIconModule,
    MatChipsModule,
  ],
  exports:[
    ReactiveFormsModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatIconModule,
    MatChipsModule,
  ]
})
export class DropdownModule { }
