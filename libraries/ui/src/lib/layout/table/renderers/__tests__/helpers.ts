import { StandardTableColumn } from '../../models/standard-table-renderer.vm';
import { SortableTableColumn } from '../../models/sortable-table-renderer.vm';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export class StandardTableRendererComponentHelper<T> {
  constructor(private _debugElement: DebugElement) {}

  getColumnByKey(key: keyof T): DebugElement {
    return this.getElement(`[data-test-id="${key}-column"]`);
  }

  getRows(): DebugElement[] {
    return this._debugElement.queryAll(By.css('[data-test-id="row"]'));
  }

  getRowCount(): number {
    return this.getRows().length;
  }

  getCellByColKey(key: keyof T, row: DebugElement): DebugElement {
    return this.getElement(`[data-test-id="${key}-cell"]`, row);
  }

  getCellValue(key: keyof T, row: DebugElement): DebugElement {
    return this.getElement('[data-test-id="cell-value"]', this.getCellByColKey(key, row));
  }

  getElement(selector: string, element?: DebugElement): DebugElement {
    const elem: DebugElement = element ? element : this._debugElement;
    return elem.query(By.css(selector));
  }

  getElementText(elem: DebugElement): string {
    return elem.nativeElement.textContent.trim();
  }
}

export class SortableTableRendererComponentHelper<T> {
  private _tableHelper: StandardTableRendererComponentHelper<T>;

  constructor(private _debugElement: DebugElement) {
    this._tableHelper = new StandardTableRendererComponentHelper<T>(
      this._debugElement.query(By.css('div[standard-table-renderer]'))
    );
  }

  getColumn(col: StandardTableColumn<T, keyof T> | SortableTableColumn<T, keyof T>): DebugElement {
    let elem = this._tableHelper.getColumnByKey(col.key);

    if (this.isSortableColumn(col)) {
      elem = this._tableHelper.getElement('[data-test-id="sortable-header"]', elem);
    }

    return elem;
  }

  isSortableColumn(column): column is SortableTableColumn<T, keyof T> {
    return !!column.isSortable;
  }
}
