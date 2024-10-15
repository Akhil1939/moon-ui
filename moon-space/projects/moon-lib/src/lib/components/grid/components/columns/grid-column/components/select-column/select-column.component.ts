import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCell, MatCellDef, MatHeaderCell, MatHeaderCellDef, MatTableDataSource } from '@angular/material/table';
import { BaseColumnOptions, CommonMatTableDataSource } from '../../../../../models';
import { GridService } from '../../../../../services/grid.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs';

@Component({
  selector: 'select-column',
  standalone: true,
  imports: [MatCheckboxModule, MatHeaderCell,
    MatCell, MatHeaderCellDef, MatCellDef],
  templateUrl: './select-column.component.html',
  styleUrl: './select-column.component.scss'
})
export class SelectColumnComponent implements OnInit {
  @Input() column!: BaseColumnOptions;
  @Input() dataSource:CommonMatTableDataSource<any> = new CommonMatTableDataSource<any>();;
  @ViewChild(MatHeaderCellDef) matHeaderCellDef!: MatHeaderCellDef;
  @ViewChild(MatCellDef) matCellDef!: MatCellDef;
  selection:SelectionModel<any> = new SelectionModel<any>(true, [], true);
  destroy$:Subject<any> = new Subject<any>();
  key:string = 'rowIndex';

  constructor(private gridService:GridService){}
  
  ngOnInit(): void {
    this.#initialize();
    this.dataSource.selection = this.selection;
    
  }
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    else{
      this.selection.clear();
      this.selection.select(...this.dataSource.data.map(row=>row[this.key]));
    }
  }
  
  #initialize() {
    
    this.selection.changed.pipe(takeUntil(this.destroy$)).subscribe(selection=>{
      if(this.column.selectionChange){
         // Emit full rows corresponding to selected keys
         const selectedRows = this.dataSource.data.filter(item => this.selection.isSelected(item[this.key]));
         this.column.selectionChange(selectedRows);  // Pass full row data
      }
    })
    this.gridService.getOptions().subscribe((options)=>{
      this.key = options.uniqueProperty ?? 'rowIndex'
      if(this.column.selectionChange){
        // Emit full rows corresponding to selected keys
        const selectedRows = this.dataSource.data.filter(item => this.selection.isSelected(item[this.key]));
        this.column.selectionChange(selectedRows);  // Pass full row data
     }
     if(this.column.isSelected){
      this.dataSource.data.forEach(row => {
        if(this.column.isSelected?.(row)){
          this.selection.select(row[this.key]);
        }
      });
  }
    })
  }
  isNewData() {
    return (
      this.dataSource.data.filter((e) => this.selection.isSelected(e[this.key]))
        .length === this.dataSource.data.length
    );
  }
  newDataHasSelected() {
    return (
      this.dataSource.data.some((e) => this.selection.isSelected(e[this.key])) &&
      this.dataSource.data.filter((e) => this.selection.isSelected(e[this.key]))
        .length < this.dataSource.data.length
    );
  }
  
}
