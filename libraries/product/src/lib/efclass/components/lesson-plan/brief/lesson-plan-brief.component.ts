import {Component, Input, NgModule, OnChanges} from '@angular/core';
import {LessonPlanDS, TagDS} from "../../../core";
import {NgIf} from "@angular/common";
import {TextTagsComponentModule} from "../../playlist-item/text-tags/text-tags";


@Component({
    selector: 'lesson-plan-brief',
    templateUrl: './lesson-plan-brief.component.html',
    styleUrls: ['./lesson-plan-brief.component.scss']
})
export class LessonPlanBriefComponent implements OnChanges {

    @Input() dataProvider: LessonPlanDS | undefined;

    public isPublished: boolean = false;
    public courseTitle: string | undefined;
    public unitTitle: string | undefined;
    public tags: TagDS[]  | undefined;

    public ngOnChanges(): void {

        if (!this.dataProvider) {
            return;
        }

        this.isPublished = this.dataProvider.isPublished ?? false;
        this.courseTitle = this.isPublished ? this.dataProvider.course?.title : '';
        this.unitTitle = this.isPublished ? this.dataProvider.unit?.title : '';

        this.tags = [
            ...this.dataProvider.skills ?? [],
            ...this.dataProvider.CEFRStages ?? []
        ];
    }
}

@NgModule({
  imports: [
    NgIf,
    TextTagsComponentModule
  ],
  declarations: [LessonPlanBriefComponent],
  exports: [LessonPlanBriefComponent]
})
export class LessonPlanBriefComponentModule {}
