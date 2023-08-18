import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortableTableRendererComponent } from './sortable-table-renderer.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { IsDefinedValuePipe } from '../../../../../core/pipes';
import { DashPipe } from '../../../../../core/pipes/dash.pipe';
import { LabelCellComponent } from '../../cell-renderers/label/label-cell.component';
import { StandardTableRendererComponent } from '../standard/standard-table-renderer.component';
import { StandardTableColumn } from '../../models/standard-table-renderer.vm';
import {
  SortableTableColumn,
  TABLE_SORT_FN_MAP,
  TableSortFnMap,
} from '../../models/sortable-table-renderer.vm';
import { SortableTableRendererComponentHelper } from '../__tests__/helpers';

interface TableData {
  data1: string;
  data2: string;
  data3: string;
  data4: string;
}

describe('SortableTableRendererComponent', () => {
  let helper: SortableTableRendererComponentHelper<TableData>;
  let component: SortableTableRendererComponent<TableData>;
  let fixture: ComponentFixture<SortableTableRendererComponent<TableData>>;
  let columns: (
    | StandardTableColumn<TableData, keyof TableData>
    | SortableTableColumn<TableData, keyof TableData>
  )[];
  let rowData: TableData;
  let sortFnMap: TableSortFnMap<TableData>;

  beforeEach(() => {
    sortFnMap = {
      // tslint:disable-next-line:no-shadowed-variable - complains that TableData type is being shadowed?
      data4: <TableData>(a, b, sortOrder) => {
        return 0;
      },
    };

    Object.keys(sortFnMap).forEach((key: keyof TableData) => {
      spyOn(sortFnMap, key).and.callThrough();
    });
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        IsDefinedValuePipe,
        DashPipe,
        LabelCellComponent,
        StandardTableRendererComponent,
        SortableTableRendererComponent,
      ],
      providers: [
        {
          provide: TABLE_SORT_FN_MAP,
          useValue: sortFnMap,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    columns = [
      {
        key: 'data1',
        label: 'data1',
        width: 10,
      },
      {
        key: 'data2',
        label: 'data2',
        width: 20,
      },
      {
        key: 'data3',
        label: 'data3',
        width: 30,
      },
      {
        key: 'data4',
        label: 'data4',
        width: 40,
        isSortable: true,
      },
    ];

    rowData = {
      data1: 'data1Value',
      data2: 'data2Value',
      data3: 'data3Value',
      data4: 'data4Value',
    };

    fixture = TestBed.createComponent<SortableTableRendererComponent<TableData>>(
      SortableTableRendererComponent
    );
    helper = new SortableTableRendererComponentHelper<TableData>(fixture.debugElement);
    component = fixture.componentInstance;
    component.columns = columns;
    component.rows = [rowData, rowData, rowData];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });

  describe('column headers', () => {
    it('should display sortable header when specified', () => {
      columns.forEach((col, index) => {
        if (!col['isSortable']) {
          return;
        }
        expect(helper.getColumn(col)).toBeTruthy();
      });
    });

    it('should execute the supplied sorting function when colummn header clicked', () => {
      columns.forEach((col, index) => {
        if (!col['isSortable']) {
          return;
        }

        const sCol: SortableTableColumn<TableData, keyof TableData> = col as SortableTableColumn<
          TableData,
          keyof TableData
        >;

        const sortableHeaderElem = helper.getColumn(col);
        expect(sortableHeaderElem).toBeTruthy();
        sortableHeaderElem.triggerEventHandler('directionChange', 'asc');
        expect(sortFnMap[sCol.key]).toHaveBeenCalled();
      });
    });
  });
});
