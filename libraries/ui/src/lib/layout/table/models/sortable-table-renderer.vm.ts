import { InjectionToken } from '@angular/core';
import { StandardTableColumn, TableRowData } from './standard-table-renderer.vm';
import {SortOrder} from "@jbr/core";

export interface ExternalSortParams<T extends TableRowData, K extends keyof T> {
  direction: SortOrder;
  column: SortableTableColumn<T, K>;
  rows: T[];
}

export interface SortableTableColumn<T extends TableRowData, K extends keyof T>
  extends StandardTableColumn<T, K> {
  isSortable: true;
  direction: SortOrder;
}

export type MixedTableColumns<T extends TableRowData> =
  StandardTableColumn<T, keyof T> | SortableTableColumn<T, keyof T>

export type MixedTableColumnsArray<T extends TableRowData> = MixedTableColumns<T>[];

export type TableSortFn<T extends TableRowData, K extends keyof T> = (
  rowData1: T,
  rowData2: T,
  sortOrder: SortOrder,
  sortColumnKey: K
) => number;

export type TableSortFnMap<T extends TableRowData> = Partial<
  Record<keyof T, TableSortFn<T, keyof T>>
>;

export const TABLE_SORT_FN_MAP = new InjectionToken<TableSortFnMap<TableRowData>>('Table sort fn map');
