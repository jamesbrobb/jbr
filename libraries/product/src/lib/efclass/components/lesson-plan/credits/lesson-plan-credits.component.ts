import {Component, Input, NgModule, OnChanges, SimpleChanges} from '@angular/core';
import {NgIf} from "@angular/common";


@Component({
    selector: 'lesson-plan-credits',
    templateUrl: './lesson-plan-credits.component.html',
    styleUrls: ['./lesson-plan-credits.component.scss']
})
export class LessonPlanCreditsComponent implements OnChanges {

    @Input('isPublishedByUser') ioIsPublishedByUser: boolean | undefined;

    public isPublishedByUser: boolean = false;

    public ngOnChanges(changes: SimpleChanges): void {
        this.isPublishedByUser = this.ioIsPublishedByUser ?? false;
    }
}


@NgModule({
  imports: [NgIf],
  declarations: [LessonPlanCreditsComponent],
  exports: [LessonPlanCreditsComponent]
})
export class LessonPlanCreditsComponentModule {}

