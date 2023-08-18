import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";

import {rotate, openClose, toClassCasePipe} from "@jbr/ui";
import {AnalyticsHrefListenerDirective, AnalyticsEventDirective} from "@jbr/ng";

import {MarkdownModule} from "ngx-markdown";

import {Page, Section} from "../../config/page/page-config";

import {EntityInfoComponent} from "../entity-info/entity-info.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MarkdownComponent} from "../markdown/markdown.component";
import {EntityTypeLabelComponent} from "../entity-type-label/entity-type-label.component";



@Component({
  selector: 'page-container',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    MarkdownModule,
    AnalyticsHrefListenerDirective,
    AnalyticsEventDirective,
    MatIconModule,
    EntityInfoComponent,
    MatExpansionModule,
    MarkdownComponent,
    EntityTypeLabelComponent,
    toClassCasePipe
  ],
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    openClose(),
    rotate()
  ]
})
export class PageContainerComponent implements OnChanges {

  @Input({required: true}) page?: Page;
  @Input() detailsURI?: string;

  sections?: Section[];

  ngOnChanges(changes?: SimpleChanges) {

    this.detailsURI = this?.detailsURI;
    this.sections = this.page?.sections?.map(page => ({
      page,
      label: page.name,
      isOpen: false
    }));
  }
}

