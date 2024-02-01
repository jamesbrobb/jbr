import {Component, Input, NgModule, OnChanges} from '@angular/core';
import {LessonPlanSummaryDs} from "../../../core";
import {NgForOf, NgIf} from "@angular/common";
import {ImageComponentModule} from "../../media";


@Component({
  selector: 'lesson-plan-card',
  templateUrl: './lesson-plan-card.component.html',
  styleUrls: ['./lesson-plan-card.component.scss']
})
export class LessonPlanCardComponent implements OnChanges {

  @Input() dataProvider: LessonPlanSummaryDs | undefined;

  public id: string | undefined;
  public title: string | undefined;
  public description: string | undefined;
  public backgroundImageUrl: string | undefined;
  public skills: string[] | undefined;
  public cefr: string | undefined;

  public ngOnChanges(): void {

    if(!this.dataProvider) {
      return;
    }

    this.id = this.dataProvider.id;
    this.title = this.dataProvider.title;
    this.description = this.dataProvider.description;
    this.backgroundImageUrl = this.dataProvider.thumbnailAssetPath;
    this.skills = this.dataProvider.skills;
    this.cefr = this.dataProvider.cefr.join(', ');
  }
}


@NgModule({
  declarations: [LessonPlanCardComponent],
  exports: [LessonPlanCardComponent],
  imports: [
    NgForOf,
    ImageComponentModule,
    NgIf
  ]
})
export class LessonPlanCardComponentModule {}
