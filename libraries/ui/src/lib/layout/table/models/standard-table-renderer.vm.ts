import {TemplateRef} from "@angular/core";

export type TableRowData = Record<string, unknown>;

export interface StandardTableColumn<T extends TableRowData, K extends keyof T = keyof T> {
  key: K & string;
  label: string;
  width?: number;
}

export interface TableHeaderCellContext<T extends TableRowData, C extends StandardTableColumn<T, keyof T>> {
  columnConfig: C;
}

export interface TableCellContext<T extends TableRowData, K extends keyof T> {
  cellData: T[K];
  rowData: T;
  columnKey: K;
}

export type TableCellRenderer<T extends TableRowData> = TemplateRef<TableCellContext<T, keyof T>>

export type TableCellRendererMap<T extends TableRowData> = {[prop in keyof T]?: TableCellRenderer<T>}
