import { Component, Input, ViewChild } from '@angular/core';
import { MatColumnDef, MatHeaderCell, MatHeaderCellDef} from '@angular/material/table';
import { BodyCellComponent } from '../body-cell/body-cell.component';
import { BaseColumnOptions } from '../../../models';
import { MatSortHeader } from '@angular/material/sort';

@Component({
  selector: 'header-cell',
  standalone: true,
  imports: [MatHeaderCell, MatHeaderCellDef, MatColumnDef, BodyCellComponent, MatSortHeader],
  templateUrl: './header-cell.component.html',
  styleUrl: './header-cell.component.scss',
})
export class HeaderCellComponent {
  @Input() column!: BaseColumnOptions;
  @ViewChild(MatHeaderCellDef, {static: false}) matHeaderCellDef!: MatHeaderCellDef
}
