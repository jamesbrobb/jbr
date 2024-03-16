import {Component, inject, TemplateRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SortableTableRendererComponent,
  MixedTableColumnsArray,
  ExternalSortParams,
  StandardTableColumn,
  StandardTableRendererComponent, GridLayoutComponentModule,
} from "@jamesbenrobb/ui";
import {MatMenuModule} from "@angular/material/menu";
import {ContentHideComponent, MarkdownComponent, DarkModeBtnComponent, SearchInputComponent} from "@jamesbenrobb/ui";
import {FormGroup, FormsModule, NgForm} from "@angular/forms";



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
    MatMenuModule,
    ContentHideComponent,
    MarkdownComponent,
    DarkModeBtnComponent,
    GridLayoutComponentModule,
    SearchInputComponent,
    FormsModule
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

  data: any = [
    {
      "id":"3DJIVvfEeINpIyGiNmsXPfve-AkwaZRjB8eMgm",
      "course":{
        "id":"J90ia9CZnuLlf9QIKX-88xl1B7gJjbvy",
        "title":"Featured lessons",
        "revision":"ef7a6d6e-bd21-11e8-8857-060e7357503a"
      },
      "thumbnailAssetPath":"/assets/media-examples/sample.png",
      "skills":[
        "Grammar ",
        "Reading ",
        "Listening "
      ],
      "cefr": [
        "B1 ",
        "B2 "
      ],
      "title":"Future Perfect",
      "description": "This is the lesson plan description. This is the lesson plan description. This is the lesson plan description",
      "unit":{
        "id":"aEpS7BIm9fY7-VByvoVrjOPNQ5",
        "title":"18 August 2017",
        "revision":"ef7c7e38-bd21-11e8-8857-060e7357503a"
      }
    }, {
      "id":"3DJIVvfEeINpIyGiNmsXPfve-AkwaZRjB8eMgm",
      "course":{
        "id":"J90ia9CZnuLlf9QIKX-88xl1B7gJjbvy",
        "title":"Featured lessons",
        "revision":"ef7a6d6e-bd21-11e8-8857-060e7357503a"
      },
      "thumbnailAssetPath":"/assets/media-examples/sample.png",
      "skills":[
        "Grammar ",
        "Reading ",
        "Listening "
      ],
      "cefr": [
        "B1 ",
        "B2 "
      ],
      "title":"Future Perfect",
      "description": "This is the lesson plan description. This is the lesson plan description. This is the lesson plan description",
      "unit":{
        "id":"aEpS7BIm9fY7-VByvoVrjOPNQ6",
        "title":"18 August 2017",
        "revision":"ef7c7e38-bd21-11e8-8857-060e7357503a"
      }
    }, {
      "id":"3DJIVvfEeINpIyGiNmsXPfve-AkwaZRjB8eMgm",
      "course":{
        "id":"J90ia9CZnuLlf9QIKX-88xl1B7gJjbvy",
        "title":"Featured lessons",
        "revision":"ef7a6d6e-bd21-11e8-8857-060e7357503a"
      },
      "thumbnailAssetPath":"/assets/media-examples/sample.png",
      "skills":[
        "Grammar ",
        "Reading ",
        "Listening "
      ],
      "cefr": [
        "B1 ",
        "B2 "
      ],
      "title":"Future Perfect",
      "description": "This is the lesson plan description. This is the lesson plan description. This is the lesson plan description",
      "unit":{
        "id":"aEpS7BIm9fY7-VByvoVrjOPNQ6",
        "title":"18 August 2017",
        "revision":"ef7c7e38-bd21-11e8-8857-060e7357503a"
      }
    }, {
      "id":"3DJIVvfEeINpIyGiNmsXPfve-AkwaZRjB8eMgm",
      "course":{
        "id":"J90ia9CZnuLlf9QIKX-88xl1B7gJjbvy",
        "title":"Featured lessons",
        "revision":"ef7a6d6e-bd21-11e8-8857-060e7357503a"
      },
      "thumbnailAssetPath":"/assets/media-examples/sample.png",
      "skills":[
        "Grammar ",
        "Reading ",
        "Listening "
      ],
      "cefr": [
        "B1 ",
        "B2 "
      ],
      "title":"Future Perfect",
      "description": "This is the lesson plan description. This is the lesson plan description. This is the lesson plan description",
      "unit":{
        "id":"aEpS7BIm9fY7-VByvoVrjOPNQ7",
        "title":"18 August 2017",
        "revision":"ef7c7e38-bd21-11e8-8857-060e7357503a"
      }
    }, {
      "id":"3DJIVvfEeINpIyGiNmsXPfve-AkwaZRjB8eMgm",
      "course":{
        "id":"J90ia9CZnuLlf9QIKX-88xl1B7gJjbvy",
        "title":"Featured lessons",
        "revision":"ef7a6d6e-bd21-11e8-8857-060e7357503a"
      },
      "thumbnailAssetPath":"/assets/media-examples/sample.png",
      "skills":[
        "Grammar ",
        "Reading ",
        "Listening "
      ],
      "cefr": [
        "B1 ",
        "B2 "
      ],
      "title":"Future Perfect",
      "description": "This is the lesson plan description. This is the lesson plan description. This is the lesson plan description",
      "unit":{
        "id":"aEpS7BIm9fY7-VByvoVrjOPNQ7",
        "title":"18 August 2017",
        "revision":"ef7c7e38-bd21-11e8-8857-060e7357503a"
      }
    }, {
      "id":"3DJIVvfEeINpIyGiNmsXPfve-AkwaZRjB8eMgm",
      "course":{
        "id":"J90ia9CZnuLlf9QIKX-88xl1B7gJjbvy",
        "title":"Featured lessons",
        "revision":"ef7a6d6e-bd21-11e8-8857-060e7357503a"
      },
      "thumbnailAssetPath":"/assets/media-examples/sample.png",
      "skills":[
        "Grammar ",
        "Reading ",
        "Listening "
      ],
      "cefr": [
        "B1 ",
        "B2 "
      ],
      "title":"Future Perfect",
      "description": "This is the lesson plan description. This is the lesson plan description. This is the lesson plan description",
      "unit":{
        "id":"aEpS7BIm9fY7-VByvoVrjOPNQ7",
        "title":"18 August 2017",
        "revision":"ef7c7e38-bd21-11e8-8857-060e7357503a"
      }
    }, {
      "id":"3DJIVvfEeINpIyGiNmsXPfve-AkwaZRjB8eMgm",
      "course":{
        "id":"J90ia9CZnuLlf9QIKX-88xl1B7gJjbvy",
        "title":"Featured lessons",
        "revision":"ef7a6d6e-bd21-11e8-8857-060e7357503a"
      },
      "thumbnailAssetPath":"/assets/media-examples/sample.png",
      "skills":[
        "Grammar ",
        "Reading ",
        "Listening "
      ],
      "cefr": [
        "B1 ",
        "B2 "
      ],
      "title":"Future Perfect",
      "description": "This is the lesson plan description. This is the lesson plan description. This is the lesson plan description",
      "unit":{
        "id":"aEpS7BIm9fY7-VByvoVrjOPNQ8",
        "title":"18 August 2017",
        "revision":"ef7c7e38-bd21-11e8-8857-060e7357503a"
      }
    }, {
      "id":"3DJIVvfEeINpIyGiNmsXPfve-AkwaZRjB8eMgm",
      "course":{
        "id":"J90ia9CZnuLlf9QIKX-88xl1B7gJjbvy",
        "title":"Featured lessons",
        "revision":"ef7a6d6e-bd21-11e8-8857-060e7357503a"
      },
      "thumbnailAssetPath":"/assets/media-examples/sample.png",
      "skills":[
        "Grammar ",
        "Reading ",
        "Listening "
      ],
      "cefr": [
        "B1 ",
        "B2 "
      ],
      "title":"Future Perfect",
      "description": "This is the lesson plan description. This is the lesson plan description. This is the lesson plan description",
      "unit":{
        "id":"aEpS7BIm9fY7-VByvoVrjOPNQ8",
        "title":"18 August 2017",
        "revision":"ef7c7e38-bd21-11e8-8857-060e7357503a"
      }
    }, {
      "id":"3DJIVvfEeINpIyGiNmsXPfve-AkwaZRjB8eMgm",
      "course":{
        "id":"J90ia9CZnuLlf9QIKX-88xl1B7gJjbvy",
        "title":"Featured lessons",
        "revision":"ef7a6d6e-bd21-11e8-8857-060e7357503a"
      },
      "thumbnailAssetPath":"/assets/media-examples/sample.png",
      "skills":[
        "Grammar ",
        "Reading ",
        "Listening "
      ],
      "cefr": [
        "B1 ",
        "B2 "
      ],
      "title":"Future Perfect",
      "description": "This is the lesson plan description. This is the lesson plan description. This is the lesson plan description",
      "unit":{
        "id":"aEpS7BIm9fY7-VByvoVrjOPNQ8",
        "title":"18 August 2017",
        "revision":"ef7c7e38-bd21-11e8-8857-060e7357503a"
      }
    }, {
      "id":"3DJIVvfEeINpIyGiNmsXPfve-AkwaZRjB8eMgm",
      "course":{
        "id":"J90ia9CZnuLlf9QIKX-88xl1B7gJjbvy",
        "title":"Featured lessons",
        "revision":"ef7a6d6e-bd21-11e8-8857-060e7357503a"
      },
      "thumbnailAssetPath":"/assets/media-examples/sample.png",
      "skills":[
        "Grammar ",
        "Reading ",
        "Listening "
      ],
      "cefr": [
        "B1 ",
        "B2 "
      ],
      "title":"Future Perfect",
      "description": "This is the lesson plan description. This is the lesson plan description. This is the lesson plan description",
      "unit":{
        "id":"aEpS7BIm9fY7-VByvoVrjOPNQ8",
        "title":"18 August 2017",
        "revision":"ef7c7e38-bd21-11e8-8857-060e7357503a"
      }
    }, {
      "id":"3DJIVvfEeINpIyGiNmsXPfve-AkwaZRjB8eMgm",
      "course":{
        "id":"J90ia9CZnuLlf9QIKX-88xl1B7gJjbvy",
        "title":"Featured lessons",
        "revision":"ef7a6d6e-bd21-11e8-8857-060e7357503a"
      },
      "thumbnailAssetPath":"/assets/media-examples/sample.png",
      "skills":[
        "Grammar ",
        "Reading ",
        "Listening "
      ],
      "cefr": [
        "B1 ",
        "B2 "
      ],
      "title":"Future Perfect",
      "description": "This is the lesson plan description. This is the lesson plan description. This is the lesson plan description",
      "unit":{
        "id":"aEpS7BIm9fY7-VByvoVrjOPNQ9",
        "title":"18 August 2017",
        "revision":"ef7c7e38-bd21-11e8-8857-060e7357503a"
      }
    }, {
      "id":"3DJIVvfEeINpIyGiNmsXPfve-AkwaZRjB8eMgm",
      "course":{
        "id":"J90ia9CZnuLlf9QIKX-88xl1B7gJjbvy",
        "title":"Featured lessons",
        "revision":"ef7a6d6e-bd21-11e8-8857-060e7357503a"
      },
      "thumbnailAssetPath":"/assets/media-examples/sample.png",
      "skills":[
        "Grammar ",
        "Reading ",
        "Listening "
      ],
      "cefr": [
        "B1 ",
        "B2 "
      ],
      "title":"Future Perfect",
      "description": "This is the lesson plan description. This is the lesson plan description. This is the lesson plan description",
      "unit":{
        "id":"aEpS7BIm9fY7-VByvoVrjOPNQ9",
        "title":"18 August 2017",
        "revision":"ef7c7e38-bd21-11e8-8857-060e7357503a"
      }
    }, {
      "id":"3DJIVvfEeINpIyGiNmsXPfve-AkwaZRjB8eMgm",
      "course":{
        "id":"J90ia9CZnuLlf9QIKX-88xl1B7gJjbvy",
        "title":"Featured lessons",
        "revision":"ef7a6d6e-bd21-11e8-8857-060e7357503a"
      },
      "thumbnailAssetPath":"/assets/media-examples/sample.png",
      "skills":[
        "Grammar ",
        "Reading ",
        "Listening "
      ],
      "cefr": [
        "B1 ",
        "B2 "
      ],
      "title":"Future Perfect",
      "description": "This is the lesson plan description. This is the lesson plan description. This is the lesson plan description",
      "unit":{
        "id":"aEpS7BIm9fY7-VByvoVrjOPNQ9",
        "title":"18 August 2017",
        "revision":"ef7c7e38-bd21-11e8-8857-060e7357503a"
      }
    }, {
      "id":"3DJIVvfEeINpIyGiNmsXPfve-AkwaZRjB8eMgm",
      "course":{
        "id":"J90ia9CZnuLlf9QIKX-88xl1B7gJjbvy",
        "title":"Featured lessons",
        "revision":"ef7a6d6e-bd21-11e8-8857-060e7357503a"
      },
      "thumbnailAssetPath":"/assets/media-examples/sample.png",
      "skills":[
        "Grammar ",
        "Reading ",
        "Listening "
      ],
      "cefr": [
        "B1 ",
        "B2 "
      ],
      "title":"Future Perfect",
      "description": "This is the lesson plan description. This is the lesson plan description. This is the lesson plan description",
      "unit":{
        "id":"aEpS7BIm9fY7-VByvoVrjOPNQ9",
        "title":"18 August 2017",
        "revision":"ef7c7e38-bd21-11e8-8857-060e7357503a"
      }
    }, {
      "id":"3DJIVvfEeINpIyGiNmsXPfve-AkwaZRjB8eMgm",
      "course":{
        "id":"J90ia9CZnuLlf9QIKX-88xl1B7gJjbvy",
        "title":"Featured lessons",
        "revision":"ef7a6d6e-bd21-11e8-8857-060e7357503a"
      },
      "thumbnailAssetPath":"/assets/media-examples/sample.png",
      "skills":[
        "Grammar ",
        "Reading ",
        "Listening "
      ],
      "cefr": [
        "B1 ",
        "B2 "
      ],
      "title":"Future Perfect",
      "description": "This is the lesson plan description. This is the lesson plan description. This is the lesson plan description",
      "unit":{
        "id":"aEpS7BIm9fY7-VByvoVrjOPNQ9",
        "title":"18 August 2017",
        "revision":"ef7c7e38-bd21-11e8-8857-060e7357503a"
      }
    }
  ]


 dataProvider = Array.from(new Array(10)).map((arg, index) => ({title: `Item ${index + 1}`}));

  @ViewChild('nameForm', {static: true}) ngForm!: NgForm;

  readonly formData = {
    firstName: 'barry',
    lastName: 'barry',
    akas: {} as { [key: string]: string }
  }

  ngAfterViewInit() {

    if(!this.ngForm) {
      return;
    }

    this.ngForm.valueChanges?.subscribe(console.log);
  }

  reset() {
    this.ngForm?.reset();
  }

  addAka() {
    const count = Object.keys(this.formData.akas).length;
    this.formData.akas[count] = '';
    console.log(this.formData);
  }

  submit() {
    console.log(this.ngForm?.value);
    console.log(this.ngForm?.valid);
  }
}
