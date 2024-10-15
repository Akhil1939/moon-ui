import { Injectable } from '@angular/core';
import { BaseColumnOptions, CommonGridOptions } from '../models';
import { BehaviorSubject, Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { CallBackFnOptions } from '../../../shared/models/common-options';
import { CellClickOptions } from '../models/cell';

@Injectable()
export class GridService {
  readonly #options$ = new BehaviorSubject<CommonGridOptions>({} as CommonGridOptions);
  readonly #dataSource$ = new BehaviorSubject<MatTableDataSource<any>>({} as MatTableDataSource<any>);
  readonly #displayColumns = new BehaviorSubject<string[]>([]);
  readonly #level1DisplayColumns = new BehaviorSubject<string[]>([]);
  readonly #level2DisplayColumns = new BehaviorSubject<string[]>([]);
  readonly #focusOut$ = new Subject<string>();
  constructor() { }
  setOptions(value: CommonGridOptions) {
    this.#options$.next(value);
  }
  getOptions() {
    return this.#options$.asObservable();
  }
  setDisplayColumns(value: string[]) {
    this.#displayColumns.next(value);
  }
  getDisplayColumns() {
    return this.#displayColumns.asObservable();
  }
  setLevel1DisplayColumns(value: string[]) {
    this.#level1DisplayColumns.next(value);
  }
  getLevel1DisplayColumns() {
    return this.#level1DisplayColumns.asObservable();
  }
  setLevel2DisplayColumns(value: string[]) {
    this.#level2DisplayColumns.next(value);
  }
  getLevel2DisplayColumns() {
    return this.#level2DisplayColumns.asObservable();
  }
  setFormFieldDefaultClasses(column: BaseColumnOptions) {
    const libClasses = ["no-hint", "sm-control"];
    if(column.options){
      if(column.options?.classes && column.options!.classes!.length > 0) {
        column.options!.classes = libClasses.concat(column.options!.classes!);
      } else {
        column.options!['classes'] = ["no-hint", "sm-control"];
      }
    }
  }

  setDataSource(data:MatTableDataSource<any>){
    this.#dataSource$.next(data);
  }
  getDataSource(){
    return this.#dataSource$.asObservable();
  }
  getFocusOut(){
    return this.#focusOut$.asObservable();
  }
  
  setFocusOut(value: string) {
    this.#focusOut$.next(value);
  }
  cellClicked(element: any, rowIndex: number, column: BaseColumnOptions,
    options: CellClickOptions) {
    setTimeout(() => {
      
        options.isCellClicked = false;
        if (column.isEditable) {
          options.isEditable = column.isEditable(element, rowIndex);
        }
        options.rowIndex = rowIndex;
        this.#setUniqueId(rowIndex, column);
        column.click?.(element);
      
      this.setFocusOut(column.options?.id ?? '');
    }, 10);
  }
  #setUniqueId(rowIndex: number, column: BaseColumnOptions) {
    if(column.options && column.options && column?.options?.id) {
      column.options.id = column.options.id + rowIndex;
    }
  }
  onCallBackFn(
    event: CallBackFnOptions,
    options: any,
    data: any,
    cellClickOptions: CellClickOptions
  ) {
    for (let key in event) {
      if (options[key]) {
        options[key](event[key], data);
      }
    }
    if(cellClickOptions.isEditable){
      cellClickOptions.isCellClicked = !cellClickOptions.isCellClicked;
    }
  }
}
