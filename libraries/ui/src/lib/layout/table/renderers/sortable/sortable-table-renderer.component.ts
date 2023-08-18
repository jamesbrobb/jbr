import {NgIf} from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Optional,
  Output,
  SimpleChanges,
} from '@angular/core';
import {comparer, SortOrder} from "@jbr/core";
import {
  TableCellRendererMap,
  TableRowData
} from '../../models/standard-table-renderer.vm';
import {
  ExternalSortParams,
  SortableTableColumn,
  MixedTableColumnsArray,
  TABLE_SORT_FN_MAP,
  TableSortFn,
  TableSortFnMap, MixedTableColumns,
} from '../../models/sortable-table-renderer.vm';
import {StandardTableRendererComponent} from "../standard/standard-table-renderer.component";
import {SortableHeaderComponent} from "../../headers/sortable/sortable-header.component";


@Component({
  selector: 'sortable-table-renderer, [sortable-table-renderer]',
  standalone: true,
  imports: [
    StandardTableRendererComponent,
    SortableHeaderComponent,
    NgIf
  ],
  templateUrl: './sortable-table-renderer.component.html',
  styleUrls: ['./sortable-table-renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortableTableRendererComponent<T extends TableRowData> implements OnChanges {
  @Input() caption?: string;
  @Input() columns?: MixedTableColumnsArray<T>;
  @Input() rows: T[] = [];
  @Input() cellRenderers?: TableCellRendererMap<T>;
  @Input() emptyLabel?: string;

  @Output() sortRequest = new EventEmitter<ExternalSortParams<T, keyof T>>();

  constructor(@Optional() @Inject(TABLE_SORT_FN_MAP) private _sortFnMap: TableSortFnMap<T>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes["rows"]) {
      this._persistCurrentSortToNewRows();
    }
  }

  onSort(direction: SortOrder, column: SortableTableColumn<T, keyof T>): void {
    this._resetSortHeadersDirectionToNone(column.key);
    this._sortRows(direction, column);
  }

  private _persistCurrentSortToNewRows(): void {

    if(!this.columns) {
      return;
    }

    this.columns
      .filter(this._isSortableColumn)
      .forEach((sortCol: SortableTableColumn<T, keyof T>) => {
        if (sortCol.direction !== 'none') {
          this._sortRows(sortCol.direction, sortCol);
        }
      });
  }

  private _resetSortHeadersDirectionToNone(excludeKey: keyof T | undefined): void {

    if(!this.columns) {
      return;
    }

    this.columns
      .filter(this._isSortableColumn)
      .filter((column) => column.key !== excludeKey)
      .forEach((sortCol: SortableTableColumn<T, keyof T>) => (sortCol.direction = 'none'));
  }

  private _sortRows(sortOrder: SortOrder, column: SortableTableColumn<T, keyof T>): void {

    const sortFn: TableSortFn<T, keyof T> = this._getSortFn(column.key);

    this.rows.sort((a, b): number => sortFn(a, b, sortOrder, column.key));
  }

  private _getSortFn(key: keyof T): TableSortFn<T, keyof T> {

    if(this._sortFnMap && this._sortFnMap[key]) {
      return this._sortFnMap[key] as TableSortFn<T, keyof T>; // not sure why this needs to be forced?
    }

    return this._defaultSort;
  }

  private _defaultSort(
    rowData1: T,
    rowData2: T,
    sortOrder: SortOrder,
    sortColumnKey: keyof T
  ): number {
    const cellData1: T[keyof T] = rowData1[sortColumnKey];
    const cellData2: T[keyof T] = rowData2[sortColumnKey];

    return comparer<T[keyof T]>(cellData1, cellData2, sortOrder);
  }

  private _isSortableColumn(col: MixedTableColumns<T>): col is SortableTableColumn<T, keyof T> {
    return 'isSortable' in col;
  }
}
