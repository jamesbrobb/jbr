import {Component, Input, NgModule, OnChanges} from '@angular/core';
import {LessonPlanDS} from "../../../core";
import {ResponsiveContainerDirectiveModule} from "@jamesbenrobb/ui";
import {LessonPlanBriefComponentModule} from "../brief/lesson-plan-brief.component";
import {LessonPlanCreditsComponentModule} from "../credits/lesson-plan-credits.component";
import {HtmlRendererComponentModule} from "../../common";
import {NgIf} from "@angular/common";


@Component({
    selector    : 'lesson-plan-info',
    templateUrl : './lesson-plan-info.component.html',
    styleUrls   : ['./lesson-plan-info.component.scss']
})
export class LessonPlanInfoComponent implements OnChanges {

    @Input() dataProvider: LessonPlanDS | undefined;

    public lessonPlan: LessonPlanDS | undefined;
    public objectives: string | undefined;
    public coveredRequirements: string | undefined;

    public ngOnChanges(): void {
        this.lessonPlan = this.dataProvider;
        this.objectives = this.lessonPlan?.objectives;
        this.coveredRequirements = this.lessonPlan?.coveredRequirements;
    }
}


@NgModule({
  declarations: [LessonPlanInfoComponent],
  exports: [LessonPlanInfoComponent],
  imports: [
    ResponsiveContainerDirectiveModule,
    LessonPlanBriefComponentModule,
    LessonPlanCreditsComponentModule,
    HtmlRendererComponentModule,
    NgIf
  ]
})
export class LessonPlanInfoComponentModule {}
