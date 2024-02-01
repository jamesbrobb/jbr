import {Component, Input, NgModule, OnChanges} from '@angular/core';
import {GridLayoutComponentModule, openClose} from "@jamesbenrobb/ui";
import {NgClass} from "@angular/common";
import {WordSenseDS} from "../../../core";
import {IconsModule} from "../../common";


@Component({
    selector: 'lesson-plan-vocabulary',
    templateUrl: './lesson-plan-vocabulary.component.html',
    styleUrls: ['./lesson-plan-vocabulary.component.scss'],
    animations: [openClose()]
})
export class LessonPlanVocabularyComponent implements OnChanges {

    @Input() dataProvider: WordSenseDS[] | undefined;

    public vocabulary: WordSenseDS[] | undefined;
    public count: number | undefined;
    public isExpanded: boolean = false;

    public ngOnChanges(): void {
        this.vocabulary = this.dataProvider?.sort(this._sortAlphabetically);
        this.count = this.dataProvider?.length;
    }

    public onExpandClick(): void {
        this.isExpanded = !this.isExpanded;
    }

    private _sortAlphabetically = (arg1: WordSenseDS, arg2: WordSenseDS): number => {

        if (arg1.headForm < arg2.headForm) {
            return -1;
        }
        if (arg1.headForm > arg2.headForm) {
            return 1;
        }

        return 0;
    }
}


@NgModule({
  imports: [
    GridLayoutComponentModule,
    IconsModule,
    NgClass
  ],
  declarations: [LessonPlanVocabularyComponent],
  exports: [LessonPlanVocabularyComponent]
})
export class LessonPlanVocabularyComponentModule {}
