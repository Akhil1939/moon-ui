import { Component, Input, ViewChild } from '@angular/core';
import { BodyCellComponent } from '../../../../cells/body-cell/body-cell.component';
import { HeaderCellComponent } from '../../../../cells/header-cell/header-cell.component';
import { BaseColumnOptions } from '../../../../../models';

@Component({
  selector: 'universal-column',
  standalone: true,
  imports: [BodyCellComponent,HeaderCellComponent],
  templateUrl: './universal-column.component.html',
  styleUrl: './universal-column.component.scss'
})
export class UniversalColumnComponent {
  @Input() column!: BaseColumnOptions;
  @ViewChild("sccHeaderCell", {static: false}) sccHeaderCell!: HeaderCellComponent;
  @ViewChild("sccBodyCell", {static: false}) sccBodyCell!: BodyCellComponent;
  constructor(){}
}
