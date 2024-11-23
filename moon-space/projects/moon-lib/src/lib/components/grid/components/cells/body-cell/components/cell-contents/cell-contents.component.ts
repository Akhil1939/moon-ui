import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonGridOptions } from '../../../../../models';
import { GridService } from '../../../../../services';
import { CallBackFnOptions } from '../../../../../../../shared/models/common-options';
import { Subject, takeUntil } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CellClickOptions } from '../../../../../models/cell';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'lib-cell-contents',
  standalone: true,
  imports: [

    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './cell-contents.component.html',
  styleUrl: './cell-contents.component.css'
})
export class CellContentsComponent implements OnInit, OnDestroy {
onChange($event: any) {
console.log($event.target.value)
}
  @Input() element: any
  @Input() column: any;
  @Input() index = -1;
  @Input() cellClickOptions!: CellClickOptions;
  options!: CommonGridOptions;
  #destroy$ = new Subject();
  isCellClicked = false;
  constructor(
    public gridService: GridService,
    private cdr:ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    // this.#setInnerTableOptions();
    this.#getFocusOut();
    this.#setOptions();
  }
  ngOnDestroy(): void {
    this.#destroy$.next(null);
    this.#destroy$.complete();
  }

  isTextOverflow(element: HTMLElement): boolean {
    return element.offsetWidth < element.scrollWidth;
  }
  getToolTip(element: any) {
    return (
      this.column?.toolTipGetter?.(element) ?? this.column.toolTipText ?? ''
    );
  }
  isVisible(element: any) {
    return this.column.isVisible ? this.column.isVisible(element) : true;
  }
  
  onCallBackFn(
    event: CallBackFnOptions,
    options: any,
    data?: any,
  ) {
    this.gridService.onCallBackFn(event, options, data, this.cellClickOptions);
    this.isCellClicked = this.cellClickOptions.isCellClicked;
  }

  #getFocusOut() {
    this.gridService.getFocusOut().pipe(takeUntil(this.#destroy$))
      .subscribe(res=>{
      this.isCellClicked = this.column.options?.id === res;
      if(this.isCellClicked)
      this.cdr.detectChanges();
    })
  }
  #setOptions() {
    this.gridService
      .getOptions()
      .pipe(takeUntil(this.#destroy$))
      .subscribe((options) => {
        this.options = options;
      });      
  }
  cellClicked(element: any, rowIndex: number) {
    this.gridService.cellClicked(element, rowIndex, this.column, this.cellClickOptions);
  }
}
