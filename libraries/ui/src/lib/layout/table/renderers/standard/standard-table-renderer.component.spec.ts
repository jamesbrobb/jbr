import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';

import { StandardTableRendererComponent } from './standard-table-renderer.component';
import { IsDefinedValuePipe } from '../../../../../core/pipes';
import { LabelCellComponent } from '../../cell-renderers/label/label-cell.component';
import { DashPipe } from '../../../../../core/pipes/dash.pipe';
import { StandardTableColumn } from '../../models/standard-table-renderer.vm';
import { runOnPushChangeDetection } from '../../../../../../testing';
import { StandardTableRendererComponentHelper } from '../__tests__/helpers';

interface TableData {
  data1: string;
  data2: string;
  data3: string;
  data4: string;
}

interface CellTableData {
  data1: string;
  data2: { value: string };
  data3: string;
}

describe('StandardTableRendererComponent', () => {
  let helper: StandardTableRendererComponentHelper<TableData>;
  let component: StandardTableRendererComponent<TableData>;
  let fixture: ComponentFixture<StandardTableRendererComponent<TableData>>;
  let columns: StandardTableColumn<TableData, keyof TableData>[];
  let rowData: TableData;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        IsDefinedValuePipe,
        DashPipe,
        LabelCellComponent,
        StandardTableRendererComponent,
        CellRendererTestComponent,
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
      },
    ];

    rowData = {
      data1: 'data1Value',
      data2: 'data2Value',
      data3: 'data3Value',
      data4: 'data4Value',
    };

    fixture = TestBed.createComponent<StandardTableRendererComponent<TableData>>(
      StandardTableRendererComponent
    );
    helper = new StandardTableRendererComponentHelper(fixture.debugElement);
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
    it('should display the supplied labels', () => {
      columns.forEach((col) => {
        const elem = helper.getColumnByKey(col.key);
        expect(elem).toBeTruthy();
        expect(helper.getElementText(elem)).toBe(col.label);
      });
    });

    it('should have the supplied width', () => {
      columns.forEach((col, index) => {
        const elem = helper.getColumnByKey(col.key);
        expect(elem).toBeTruthy();
        expect(elem.styles.width).toBe(`${(index + 1) * 10}%`);
      });
    });
  });

  describe('rows', () => {
    it('should be displayed for each row data item supplied', () => {
      expect(helper.getRowCount()).toBe(3);
    });
  });

  describe('cells', () => {
    it('should render the supplied data for the column', () => {
      const rows = helper.getRows();
      rows.forEach((row, index) => {
        columns.forEach((col) => {
          const cell = helper.getCellValue(col.key, row);
          expect(cell).toBeTruthy();
          expect(helper.getElementText(cell)).toBe(component.rows[index][col.key]);
        });
      });
    });

    it('should render a dash if the data is undefined', async () => {
      component.rows = [
        {
          data1: 'data1Value',
          data2: 'data2Value',
          data3: undefined,
          data4: 'data4Value',
        },
      ];

      await runOnPushChangeDetection(fixture);

      const rows = helper.getRows();
      rows.forEach((row, index) => {
        columns.forEach((col) => {
          const cell = helper.getCellValue(col.key, row);
          const value = component.rows[index][col.key];
          expect(cell).toBeTruthy();
          expect(helper.getElementText(cell)).toBe(value ? value : '-');
        });
      });
    });

    describe('renderer', () => {
      let cellTest: ComponentFixture<CellRendererTestComponent>;
      let cellTestCols: StandardTableColumn<CellTableData, keyof CellTableData>[];
      let cellTestData: CellTableData[];

      beforeEach(async () => {
        cellTestCols = [
          {
            key: 'data1',
            label: 'data1',
          },
          {
            key: 'data2',
            label: 'data2',
          },
          {
            key: 'data3',
            label: 'data3',
          },
        ];

        cellTestData = [
          {
            data1: 'data1Value',
            data2: { value: 'data2Value' },
            data3: undefined,
          },
        ];

        cellTest = TestBed.createComponent(CellRendererTestComponent);
        cellTest.componentInstance.columns = cellTestCols;
        cellTest.componentInstance.rows = cellTestData;
        cellTest.detectChanges();
      });

      it('should be rendered if one is supplied for the column key', () => {
        const valueElem = helper.getElement('[data-test-id="value"]', cellTest.debugElement);
        const data1Elem = helper.getElement('[data-test-id="data1"]', cellTest.debugElement);
        const colKeyElem = helper.getElement('[data-test-id="col-key"]', cellTest.debugElement);

        expect(helper.getElementText(valueElem)).toBe(cellTestData[0].data2.value);
        expect(helper.getElementText(data1Elem)).toBe(cellTestData[0].data1);
        expect(helper.getElementText(colKeyElem)).toBe(cellTestCols[1].key);
      });

      it('should render a dash if a renderer is supplied but the data is undefined', () => {
        const tableElem = helper.getElement('standard-table-renderer', cellTest.debugElement);
        expect(tableElem.componentInstance.cellRenderers.data3).toBeTruthy();
        const rowElem = helper.getElement('[data-test-id="row"]', cellTest.debugElement);
        const cellValueElem = helper.getCellValue('data3', rowElem);
        expect(helper.getElementText(cellValueElem)).toBe('-');
      });
    });
  });
});

@Component({
  selector: 'cell-renderer-test',
  template: `
    <standard-table-renderer
      [rows]="rows"
      [columns]="columns"
      [cellRenderers]="{ data2: cell, data3: cell }"
    >
    </standard-table-renderer>
    <ng-template #cell let-cellData="cellData" let-rowData="rowData" let-columnKey="columnKey">
      <div>
        <div data-test-id="value">{{ cellData.value }}</div>
        <div data-test-id="data1">{{ rowData.data1 }}</div>
        <div data-test-id="col-key">{{ columnKey }}</div>
      </div>
    </ng-template>
  `,
})
class CellRendererTestComponent {
  @Input() rows: CellTableData[];
  @Input() columns: StandardTableColumn<CellTableData, keyof CellTableData>[];
}
