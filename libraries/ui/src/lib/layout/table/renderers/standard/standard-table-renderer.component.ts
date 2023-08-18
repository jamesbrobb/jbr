import { ChangeDetectionStrategy, Component, Input, OnChanges, TemplateRef } from '@angular/core';
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {
  StandardTableColumn,
  TableHeaderCellContext,
  TableRowData, TableCellRendererMap,
} from '../../models/standard-table-renderer.vm';
import {IsDefinedValuePipe} from "../../../../pipes";
import {LabelCellComponent} from "../../cell-renderers/label/label-cell.component";


@Component({
  selector: 'standard-table-renderer, [standard-table-renderer]',
  standalone: true,
  imports: [
    IsDefinedValuePipe,
    NgTemplateOutlet,
    LabelCellComponent,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./standard-table-renderer.component.scss'],
  templateUrl: './standard-table-renderer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandardTableRendererComponent<T extends TableRowData> implements OnChanges {
  @Input() caption?: string;
  @Input() columns?: StandardTableColumn<T, keyof T>[];
  @Input() rows: T[] = [];
  @Input() customHeaderCellRenderer: TemplateRef<TableHeaderCellContext<T, StandardTableColumn<T, keyof T>>> | null = null;
  @Input() cellRenderers?: TableCellRendererMap<T>;

  @Input('emptyLabel') ioEmptyLabel?: string;

  emptyLabel?: string;

  ngOnChanges() {
    this.emptyLabel = this.ioEmptyLabel ? this.ioEmptyLabel : 'No entries';
  }
}
