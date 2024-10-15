import { PageEvent } from "@angular/material/paginator";

export interface PaginatorOptions {
    pageSizeOptions: number[] ;
    pageSize: number;
    length: number;
    pageIndex:number;
    onChangePage?($event: PageEvent): void;
}
