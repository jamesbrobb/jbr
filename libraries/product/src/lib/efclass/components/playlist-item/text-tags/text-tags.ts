import {Component, Input, NgModule, OnChanges} from '@angular/core';
import {TagDS} from "../../../core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgForOf, NgIf} from "@angular/common";


@Component({
    selector: 'text-tags',
    templateUrl: './text-tags.html',
    styleUrls: ['./text-tags.scss']
})
export class TextTagsComponent implements OnChanges {

    @Input() dataProvider: TagDS[] | undefined;

    public tags: TagDS[] | undefined;
    public noTags: boolean | undefined;

    public ngOnChanges(): void {
        this.tags = this.dataProvider;
        this.noTags = !this.tags || !this.tags.length;
    }
}

@NgModule({
  declarations: [TextTagsComponent],
  imports: [
    MatTooltipModule,
    NgIf,
    NgForOf
  ],
  exports: [TextTagsComponent]
})
export class TextTagsComponentModule {}
