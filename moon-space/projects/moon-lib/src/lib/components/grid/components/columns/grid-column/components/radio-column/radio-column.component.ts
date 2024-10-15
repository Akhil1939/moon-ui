import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, ViewChild } from '@angular/core';
import { MatRadioButton } from '@angular/material/radio';
import { MatTableDataSource, MatHeaderCellDef, MatCellDef, MatHeaderCell, MatCell } from '@angular/material/table';
import { BaseColumnOptions } from '../../../../../models';
import { Subject, takeUntil } from 'rxjs';
import { GridService } from '../../../../../services';

@Component({
  selector: 'radio-column',
  standalone: true,
  imports: [MatRadioButton, MatHeaderCell, MatCell, MatHeaderCellDef, MatCellDef],
  templateUrl: './radio-column.component.html',
  styleUrl: './radio-column.component.scss'
})
export class RadioColumnComponent {
  @Input() column!: BaseColumnOptions;
  @Input() dataSource!: MatTableDataSource<any>;
  @ViewChild(MatHeaderCellDef) matHeaderCellDef!: MatHeaderCellDef;
  @ViewChild(MatCellDef) matCellDef!: MatCellDef;
  selectedRow: any = null;
  destroy$: Subject<any> = new Subject<any>();

  constructor(private gridService: GridService) { }

  ngOnInit(): void {
    this.initialize();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  /** Selects the given row */
  selectRow(row: any) {
    this.selectedRow = row;
    if (this.column.selectionChange) {
      this.column.selectionChange?.(this.selectedRow);
    }
  }

  /** Checks if the given row is selected */
  isSelected(row: any) { //TODO if required
    return this.selectedRow === row;
  }

  initialize() {
    this.gridService.getDataSource().pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.selectedRow = null;
    });
  }
}