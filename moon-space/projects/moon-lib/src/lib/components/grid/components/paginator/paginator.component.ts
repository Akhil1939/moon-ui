import { Component, OnDestroy, OnInit, ViewChild, input } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommonGridOptions } from '../../models';
import { GridService } from '../../services';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'lib-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent implements OnInit, OnDestroy {
  options = new CommonGridOptions<any>();
  dataSource = input.required<MatTableDataSource<any>>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  destroy$ = new Subject();

  constructor(private gridService: GridService){}
  ngOnInit(): void {
    this.#setOptions();
  }
  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  pageChanged($event: PageEvent) {
    this.options.paginatorOptions?.onChangePage?.($event);
  }
  #setOptions() {
    this.gridService.getOptions().pipe(takeUntil(this.destroy$)).subscribe((options) => {
      this.options = options;
      if (this.paginator && this.options?.paginatorOptions?.pageIndex) {
        this.paginator.pageIndex = this.options.paginatorOptions.pageIndex - 1;
      }
    });
  }
}
