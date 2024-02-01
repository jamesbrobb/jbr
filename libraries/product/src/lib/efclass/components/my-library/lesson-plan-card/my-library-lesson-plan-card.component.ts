import {
  Component,
  Input, NgModule,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import {CommonModule} from "@angular/common";
import {MatMenu, MatMenuModule} from "@angular/material/menu";

import {DateUtils} from "@jamesbenrobb/core";

import {LessonPlanSummaryDs} from "../../../core/lesson-plan/summary/lesson-plan-summary.ds";
import {ImageComponentModule} from "../../media";
import {IconsModule} from "../../common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



@Component({
    selector: 'my-library-lesson-plan-card',
    templateUrl: './my-library-lesson-plan-card.component.html',
    styleUrls: ['./my-library-lesson-plan-card.component.scss']
})
export class MyLibraryLessonPlanCardComponent implements OnChanges {

    @Input() dataProvider: LessonPlanSummaryDs | undefined;
    @Input() menu: MatMenu | undefined;

    public id: string | undefined;
    public title: string | undefined;
    public description: string | undefined;
    public backgroundImageUrl: string | undefined;
    public skills: string[] | undefined;
    public cefr: string | undefined;
    public modifiedDate: string | undefined;

    public ngOnChanges(changes: SimpleChanges): void {

        if (!this.dataProvider) {
            return;
        }

        this.id = this.dataProvider.id;
        this.title = this.dataProvider.title;
        this.description = this.dataProvider.description;
        this.backgroundImageUrl = this.dataProvider.thumbnailAssetPath;
        this.skills = this.dataProvider.skills;
        this.cefr = this.dataProvider.cefr.join(', ');
        this.modifiedDate = DateUtils.getAbbreviatedFormat(this.dataProvider.modified);
    }

    public onOptionsClick(event: MouseEvent): void {
        event.stopImmediatePropagation();
    }
}

@NgModule({
  imports: [
    CommonModule,
    ImageComponentModule,
    MatMenuModule,
    IconsModule
  ],
  declarations: [MyLibraryLessonPlanCardComponent],
  exports: [MyLibraryLessonPlanCardComponent]
})
export class MyLibraryLessonPlanCardComponentModule {}
