import { ChangeDetectionStrategy, Component, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { UniversalColumnComponent } from './components/universal-column/universal-column.component';
import { CommonModule } from '@angular/common';
import { SelectColumnComponent } from './components/select-column/select-column.component';
import { BaseColumnOptions, ColumnReference, CommonMatTableDataSource } from '../../../models';
import { MatSortHeader } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { RadioColumnComponent } from './components/radio-column/radio-column.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'grid-column',
  standalone: true,
  imports: [MatColumnDef, CommonModule,MatCellDef, MatCell,
    UniversalColumnComponent, SelectColumnComponent, MatHeaderCell, MatHeaderCellDef, MatSortHeader, RadioColumnComponent],
  templateUrl: './grid-column.component.html',
  styleUrl: './grid-column.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridColumnComponent {
  @Input() column!: BaseColumnOptions;
  @Input() dataSource:CommonMatTableDataSource<any> = new CommonMatTableDataSource<any>();;
  @ViewChildren(MatColumnDef) matColumnDef!: QueryList<MatColumnDef>;
  @ViewChild("columnReference", {static: false}) columnReference!: ColumnReference;
  @ViewChild(MatHeaderCellDef, {static: false}) matHeaderCellDef!: MatHeaderCellDef
  @ViewChild(MatCellDef, {static: false}) matCellDef!: MatCellDef;

  #destroy$ = new Subject<any>()
  constructor(private matTable: MatTable<any>) {}
  ngAfterViewInit(): void {
    this.updateColumnDefs();
    // updates ColumnDefs on any changes
    this.matColumnDef.changes?.pipe(takeUntil(this.#destroy$)).subscribe(() => {
      this.updateColumnDefs();
    });
  }
  updateColumnDefs() {
    this.matColumnDef.forEach((columnDef) => {
      if (columnDef.name !== 'select' && columnDef.name !== 'radio') {
        columnDef.headerCell = this.columnReference.sccHeaderCell.matHeaderCellDef;
        columnDef.cell = this.columnReference.sccBodyCell.matCellDef;
      } else {
        columnDef.headerCell = this.columnReference.matHeaderCellDef;
        columnDef.cell = this.columnReference.matCellDef;
      }
      if (!(this.matTable && this.matTable['_columnDefsByName'] && this.matTable['_columnDefsByName'].get(columnDef.name))) {
        this.matTable.addColumnDef(columnDef);
      }
    });
  }
  ngOnDestroy(): void {
    this.#destroy$.next(null);
    this.#destroy$.complete();
  }
}
