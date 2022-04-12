import { TemplateRef } from '@angular/core';

import { NgTemplateNameDirective } from './ng-template-name.directive';

export enum GridConfigOption {
  header = 'header',
  cssCell = 'cssCell',
  cssHeader = 'cssHeader',
  templateRefHeader = 'templateRefHeader',
  templateRefCell = 'templateRefCell',
}
export type GridConfigOptionsKeys = keyof typeof GridConfigOption;
export type GridConfigOptions = {
  [key in keyof typeof GridConfigOption]: string | TemplateRef<NgTemplateNameDirective>;
};

export interface GridConfig {
  [key: string]: string | Partial<GridConfigOptions>;
}

export interface GridTemplate {
  row: unknown;
}

export interface PaginatedQuery {
  pageIndex: number;
  pageSize: number;
}
