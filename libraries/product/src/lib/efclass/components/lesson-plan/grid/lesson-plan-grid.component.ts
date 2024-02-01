import {
  Component,
  EventEmitter,
  Input, NgModule,
  OnChanges,
  Output,
  TemplateRef
} from '@angular/core';

import {LessonPlanSummaryDs} from "../../../core";
import {LessonPlanCardComponentModule} from "../card/lesson-plan-card.component";
import {GridLayoutComponentModule, ResponsiveContainerDirectiveModule} from "@jamesbenrobb/ui";
import {NgClass, NgIf, NgTemplateOutlet} from "@angular/common";
import {LessonPlanHeroComponentModule} from "../hero/lesson-plan-hero.component";


@Component({
    selector: 'lesson-plan-grid',
    templateUrl: './lesson-plan-grid.component.html',
    styleUrls: ['./lesson-plan-grid.component.scss']
})
export class LessonPlanGridComponent implements OnChanges {

    @Input() dataProvider: LessonPlanSummaryDs[] | undefined;
    @Input('header') ioHeader: string | undefined;
    @Input('title') ioTitle: string | undefined;
    @Input('showHero') ioShowHero: boolean = false;
    @Input('fiveCardLayout') ioFiveCardLayout: boolean = false;

    @Input() itemTemplate: TemplateRef<unknown> | undefined;

    @Output() lessonPlanSelected = new EventEmitter<LessonPlanSummaryDs>();

    public data: LessonPlanSummaryDs[] | undefined;
    public heroData: LessonPlanSummaryDs | undefined;
    public header: string | undefined;
    public title: string | undefined;
    public showHero: boolean = false;
    public showFiveCardLayout: boolean | undefined;


    public ngOnChanges(): void {

        this.header = this.ioHeader;
        this.title = this.ioTitle;
        this.showHero = this.ioShowHero;
        this.showFiveCardLayout = this.ioFiveCardLayout;

        const data = this.dataProvider;

        if (!data) {
            this.data = undefined;
            this.heroData = undefined;
            return;
        }

        if (this.showHero) {
            this.heroData = data[0];
            this.data = data.slice(1);
            return;
        }

        this.heroData = undefined;
        this.data = data;
    }

    public onLessonPlanSelect(playlist?: LessonPlanSummaryDs): void {
        this.lessonPlanSelected.emit(playlist);
    }
}


@NgModule({
  declarations: [LessonPlanGridComponent],
  exports: [LessonPlanGridComponent],
  imports: [
    LessonPlanCardComponentModule,
    ResponsiveContainerDirectiveModule,
    NgClass,
    NgIf,
    LessonPlanHeroComponentModule,
    GridLayoutComponentModule,
    NgTemplateOutlet
  ],
})
export class LessonPlanGridComponentModule {}
