import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatHeaderRow, MatHeaderRowDef, MatTable } from '@angular/material/table';
import { GridService } from '../../../services';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'header-row',
  standalone: true,
  imports: [MatHeaderRow, MatHeaderRowDef],
  templateUrl: './header-row.component.html',
  styleUrl: './header-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderRowComponent implements AfterViewInit, OnDestroy {
   @Input() displayedColumns= [] as string[];
   @Input() level1DisplayedColumns= [] as string[];
   @Input() level2DisplayedColumns= [] as string[];
  @ViewChildren(MatHeaderRowDef) matHeaderRowDef!: QueryList<MatHeaderRowDef>;
  #destroy$ = new Subject();
  constructor(private matTable: MatTable<any>,
    private gridService: GridService,
    public cdr:ChangeDetectorRef, private ngZone: NgZone
  ) {}
  ngAfterViewInit(): void {
    if(this.matTable && this.matHeaderRowDef) {
      this.matHeaderRowDef.forEach((item) => {
        if(item) {
          this.matTable.addHeaderRowDef(item);
        }
      });
    }
  }
  ngOnDestroy(): void {
    this.#destroy$.next(null);
    this.#destroy$.complete();
  }

}
