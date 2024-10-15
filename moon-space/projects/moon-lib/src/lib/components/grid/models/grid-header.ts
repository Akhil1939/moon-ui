import { Component, Type } from '@angular/core';

export interface GridHeaderOptions<T = any> {
  // contentProjection?: Type<Component>;
  // contentProjectionData?: any;
  gridHeaderActions?: GridHeaderActions<T>[];
}

export interface GridHeaderActions<T = any> {
  contentOptions?: any; // Need to rethink
  type: 'button' | 'icon' | 'menu';
  listOptions: T;
  src?: string;
}