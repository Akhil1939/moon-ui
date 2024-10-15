import { CommonModule } from '@angular/common';
import { AfterContentInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { MatRow, MatRowDef, MatTable } from '@angular/material/table';
import { GridService } from '../../../services';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { take } from 'rxjs/internal/operators/take';
import { CommonGridOptions } from '../../../models';
import { GridColumnComponent } from '../../columns/grid-column/grid-column.component';

@Component({
  selector: 'body-row',
  standalone: true,
  imports: [MatRowDef, MatRow, CommonModule, GridColumnComponent],
  templateUrl: './body-row.component.html',
  styleUrl: './body-row.component.scss'
})
export class BodyRowComponent implements AfterContentInit, OnDestroy, OnInit {
  @Input() displayedColumns!: string[];
  @Output() rowToggled = new EventEmitter();
  @ViewChildren(MatRowDef) matRowsDef!: QueryList<MatRowDef<any>>;
  #destroy$ = new Subject();
  options: CommonGridOptions | undefined
  level1DisplayedColumns = [] as string[];
  level2DisplayedColumns = [] as string[];
  constructor(public matTable: MatTable<any>,
    private cDRef: ChangeDetectorRef,
    private gridService:GridService) {
  }
  ngOnInit(): void {
    this.#setOptions();
    this.#setInnerDisplayCols()
  }
  ngAfterContentInit(): void {
    this.cDRef.detectChanges();
    if (this.matRowsDef) {
      this.matRowsDef.forEach((matRowD) => {
        this.matTable.addRowDef(matRowD);
      })
    }
  }
  ngOnDestroy(): void {
    this.#destroy$.next(null);
    this.#destroy$.complete();
  }
  #setOptions() {
    this.gridService.getOptions().pipe(takeUntil(this.#destroy$)).pipe(take(1)).subscribe((options) => {
       this.options = options;
     });
  }
  #setInnerDisplayCols() {
    this.gridService.getLevel1DisplayColumns().pipe(takeUntil(this.#destroy$)).pipe(take(1)).subscribe((options) => {
       this.level1DisplayedColumns = options;
     });
    this.gridService.getLevel2DisplayColumns().pipe(takeUntil(this.#destroy$)).pipe(take(1)).subscribe((options) => {
       this.level2DisplayedColumns = options;
     });
  }
}
