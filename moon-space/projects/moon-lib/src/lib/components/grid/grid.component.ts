import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BaseColumnOptions, CommonGridOptions, CommonMatTableDataSource } from './models';
import { Sort } from '@angular/material/sort';
import { Subject } from 'rxjs/internal/Subject';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTable } from '@angular/material/table';
import { distinctUntilChanged } from 'rxjs';
import { GridModule } from './module';
import { GridService } from './services';

/**
 * @description Read description on "CommonGridOptions" interface
 * @params input ``options: CommonGridOptions ``
 *
 * Usage @example
 * ``
 * <lib-common-grid [options]="options"></lib-common-grid>
 * ``
 */
@Component({
  selector: 'moon-grid',
  standalone: true,
  imports: [GridModule],
  host: { ngSkipHydration: 'true' },
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [GridService],
})
export class GridComponent implements OnInit, OnDestroy {
 options = input.required<CommonGridOptions<any>>();
  @ViewChild(MatTable, {static: false}) outerMatTable!: MatTable<any>;
  displayedColumns = [] as string[];
  copiedDisplayedColumns = [] as string[];
  dataSource = new CommonMatTableDataSource<any>();
  #destroy$ = new Subject();
  level1DisplayedColumns= [] as string[];
  level2DisplayedColumns= [] as string[];
  columns = [] as BaseColumnOptions[]
  level1Columns = [] as BaseColumnOptions[]
  level2Columns = [] as BaseColumnOptions[]
  cellClickOptions = {
    rowIndex: 0,
    isCellClicked: false,
    isEditable: false,
  }
  isRefreshed = false;
  constructor(
    public gridService: GridService,
  ) {}
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: any) {
    this.#handleClickEvent(event)
  }
  ngOnInit() {
    this.setTableOptions();
    this.setDisplayedItems();
    this.#refreshComponent();
  }
  ngOnDestroy(): void {
    this.#destroy$.next(null);
    this.#destroy$.complete();
  }
 
  announceSortChange(sortState: Sort) {
      this.options().sortChange?.(sortState);
    }
  setTableOptions() {
    this.gridService.setOptions(this.options());
    this.dataSource.data = this.options().data;
    this.dataSource.selection = new SelectionModel<any>(true, [], true);
    this.gridService.setDataSource(this.dataSource);
  }

  cellClicked(element: any, rowIndex: number, column: BaseColumnOptions) {
    this.gridService.cellClicked(element, rowIndex, column, this.cellClickOptions);
  }
  private setDisplayedItems() {
    if (this.options().columns?.length > 0) {
      this.copiedDisplayedColumns = this.options().columns.map(
        (column) => column.property
      );
    this.#divideNestedColumns();
    }
  }

  #refreshComponent() {
    if (this.options().refresh$ !== undefined) {
      this.options().refresh$?.pipe(distinctUntilChanged()).subscribe((value) => {
        if (value && Array.isArray(value)) {
          this.dataSource.data = value;
          this.gridService.setOptions(this.options());
        }
      })
    }
  }
  
  #divideNestedColumns() {
    if(this.options().isMultipleRow){
      this.columns = this.options().columns.filter(col=>col.level == undefined || col.level == 0);
      this.displayedColumns = this.columns.map(col=>col.property);
      this.gridService.setDisplayColumns(this.displayedColumns);

      this.level1Columns = this.options().columns.filter(col=>col.level == 1);
      this.level1DisplayedColumns = this.level1Columns.map(col=>col.property);
      this.gridService.setLevel1DisplayColumns(this.level1DisplayedColumns);

      this.level2Columns = this.options().columns.filter(col=>col.level == 2);
      this.level2DisplayedColumns = this.level2Columns.map(col=>col.property)
      this.gridService.setLevel2DisplayColumns(this.level2DisplayedColumns);

    }else{
      this.columns = this.options().columns.filter(col=>col.level == undefined || col.level == 0);
      this.displayedColumns = this.columns.map(col=>col.property);
      this.gridService.setDisplayColumns(this.displayedColumns);
    }
  }
  #handleClickEvent(event:any) {
    const table = document.querySelector('#'+this.options().id);
    if (!table?.contains((event.target).closest('td'))) {
      this.gridService.setFocusOut('') // pass id that does not match
    }
  }

}
