import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CellClickOptions } from '../../../../../models/cell';
import { BaseColumnOptions } from '../../../../../models';
import { GridService } from '../../../../../services';
import { CallBackFnOptions } from '../../../../../../../shared/models';

@Component({
  selector: 'lib-cell-action',
  standalone: true,
  imports: [

  ],
  templateUrl: './cell-action.component.html',
  styleUrl: './cell-action.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellActionComponent {
  @Input() cellClickOptions!: CellClickOptions
  @Input() element!: any
  @Input() column: BaseColumnOptions<any> | undefined
  constructor(private gridService: GridService){}
  onCallBackFn(
    event: CallBackFnOptions,
    options: any,
    data?: any,
  ) {
    this.gridService.onCallBackFn(event, options, data, this.cellClickOptions);
  }
  getMenuListOptions(element: any, index: number) {
    return this.column?.actions?.at(index)?.options.optionsGetter?.(element);
  }
  
}
