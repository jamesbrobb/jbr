import {Component, Input, NgModule, OnChanges} from '@angular/core';
import {LessonPlanDS, WordSenseDS} from "../../../core";
import {OVERLAY_COLORS} from "../../common";
import {FALLBACK_COLORS} from "../../media";
import {PageHeaderComponentModule} from "../../layout";
import {NgIf} from "@angular/common";
import {LessonPlanInfoComponentModule} from "../info/lesson-plan-info.component";
import {LessonPlanVocabularyComponentModule} from "../vocabulary/lesson-plan-vocabulary.component";


@Component({
    selector: 'lesson-plan-header',
    templateUrl: './lesson-plan-header.component.html',
    styleUrls: ['./lesson-plan-header.component.scss']
})
export class LessonPlanHeaderComponent implements OnChanges {

    @Input() dataProvider?: LessonPlanDS;
    @Input('headerColor') ioHeaderColor?: OVERLAY_COLORS;
    @Input('hideContent') ioHideContent?: boolean;

    readonly fallbackColor: FALLBACK_COLORS = FALLBACK_COLORS.WHITE;

    public headerColor: OVERLAY_COLORS = OVERLAY_COLORS.BLUE;
    public hideContent?: boolean;
    public title?: string;
    public thumbnailAssetPath?: string;
    public lessonPlan?: LessonPlanDS;
    public vocabulary?: WordSenseDS[];

    public ngOnChanges(): void {

        this.headerColor = this.ioHeaderColor || OVERLAY_COLORS.BLUE;
        this.hideContent = this.ioHideContent;
        this.title = this.dataProvider?.title;
        this.thumbnailAssetPath = this.dataProvider?.thumbnailAssetPath;
        this.lessonPlan = this.dataProvider;
        this.vocabulary = this.dataProvider?.vocabulary;
    }
}


@NgModule({
  imports: [
    PageHeaderComponentModule,
    NgIf,
    LessonPlanInfoComponentModule,
    LessonPlanVocabularyComponentModule
  ],
  declarations: [LessonPlanHeaderComponent],
  exports: [LessonPlanHeaderComponent]
})
export class LessonPlanHeaderComponentModule {}
