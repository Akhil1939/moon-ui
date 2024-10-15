import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCell, MatCellDef, MatColumnDef, MatTableModule } from '@angular/material/table';
import { GridColumnComponent } from './components/columns/grid-column/grid-column.component';
import { BodyRowComponent } from './components/rows/body-row/body-row.component';
import { HeaderRowComponent } from './components/rows/header-row/header-row.component';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { CellContentsComponent } from './components/cells/body-cell/components/cell-contents/cell-contents.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    GridColumnComponent,
    HeaderRowComponent,
    BodyRowComponent,
    ReactiveFormsModule,
    MatSortModule,
    MatCardModule,
    MatCardModule,
    PaginatorComponent,
    MatColumnDef,
    MatCellDef,
    MatCell,
    CellContentsComponent,
  ],
  exports: [
    CommonModule,
    MatTableModule,
    GridColumnComponent,
    HeaderRowComponent,
    BodyRowComponent,
    ReactiveFormsModule,
    MatSortModule,
    MatCardModule,
    MatCardModule,
    PaginatorComponent,
    MatColumnDef,
    MatCellDef,
    MatCell,
    CellContentsComponent,

  ],
})
export class GridModule {}
