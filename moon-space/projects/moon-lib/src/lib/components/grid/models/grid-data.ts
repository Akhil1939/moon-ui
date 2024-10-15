import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource  } from "@angular/material/table";
export class CommonMatTableDataSource<T> extends MatTableDataSource<T> {
    selection = new SelectionModel<any>;
}