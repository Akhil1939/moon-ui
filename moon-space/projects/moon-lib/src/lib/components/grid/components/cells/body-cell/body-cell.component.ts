import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatCell, MatCellDef } from '@angular/material/table';
import { GridService } from '../../../services/grid.service';
import { BaseColumnOptions } from '../../../models';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { CellContentsComponent } from './components/cell-contents/cell-contents.component';
import { CellClickOptions } from '../../../models/cell';
import { CellActionComponent } from './components/cell-action/cell-action.component';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'body-cell',
  standalone: true,
  imports: [
    MatCellDef,
    MatCell,
    CommonModule,
    CellContentsComponent,
    CellActionComponent,
    MatCheckboxModule
  ],
  templateUrl: './body-cell.component.html',
  styleUrl: './body-cell.component.scss',
})
export class BodyCellComponent implements OnInit, OnDestroy {
  @Input() column!: BaseColumnOptions;
  @ViewChild(MatCellDef, { static: false }) matCellDef!: MatCellDef;
  #destroy$ = new Subject();
  cellClickOptions: CellClickOptions = {
    rowIndex: 0,
    isCellClicked: false,
    isEditable: false,
  }
  constructor(
    private gridService: GridService,
  ) {}

  ngOnInit(): void {
    this.#setColumnActions();
  }
  ngOnDestroy(): void {
    this.#destroy$.next(null);
    this.#destroy$.complete();
  }

  cellClicked(element: any, rowIndex: number) {
    this.gridService.cellClicked(element, rowIndex, this.column, this.cellClickOptions);
  }
  
  #setColumnActions() {
    if (this.column?.actions?.length! > 0) {
      this.column.actions?.forEach((action) => {
        if (!action.isVisible) {
          action['isVisible'] = () => true;
        }
      });
    }
  }
  getClasses(element: any): string[] {
    return this.column?.classGetter?.(element) ?? [];
  }
  
  getStyle(element: any): object{
    return this.column?.getStyle?.(element) ?? {};
  }

  onCheckboxChange(event:MatCheckboxChange, element:any, index:number){
    this.column.onCheckChange?.(event, element, index)
  }
}
