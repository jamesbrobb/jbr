import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SortableTableRendererComponent,
  MixedTableColumnsArray,
  ExternalSortParams,
  StandardTableColumn,
  StandardTableRendererComponent,
  ComponentLoaderDirective
} from "@jbr/ui";



type Data = {
  a: string,
  b: string,
  c: number,
  d: boolean
}

type blah = Record<keyof Data, unknown>



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    StandardTableRendererComponent,
    SortableTableRendererComponent,
    ComponentLoaderDirective
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  label: string = 'Table label';
  standardColumns: StandardTableColumn<Data>[] = [{
    key: 'a',
    label: 'column A'
  }, {
    key: 'b',
    label: 'column B'
  }, {
    key: 'c',
    label: 'column C'
  }, {
    key: 'd',
    label: 'column D'
  }];
  sortableColumns: MixedTableColumnsArray<Data> = [{
    key: 'a',
    label: 'column 1',
    isSortable: true,
    direction: 'none',
  }, {
    key: 'b',
    label: 'column 2'
  }, {
    key: 'c',
    label: 'column 3',
    isSortable: true,
    direction: 'none',
  }, {
    key: 'd',
    label: 'column 4',
    isSortable: true,
    direction: 'none',
  }];

  rows: Data[] = new Array(10).fill(1).map((item, index) => ({
    a: `Label A${index}`,
    b: `Label B${index}`,
    c: index - 5,
    d: (index % 2) === 0
  }));

  sortRequest(params: ExternalSortParams<Data, keyof Data>): void {
    console.log(params);
  }


  componentType?: string;
  inputs?: {title: string};

  async loadComponent(type: string) {
    this.componentType = type;
  }

  updateTitle(): void {
    this.inputs = {
      title: this.#makeid(Math.random() * 10)
    }
  }

  #makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
