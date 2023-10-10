import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";

import {MarkdownModule} from "ngx-markdown";

import {rotate, openClose, toClassCasePipe} from "@jbr/ui";
import {AnalyticsHrefListenerDirective, AnalyticsEventDirective} from "@jbr/ng";

import {EntityInfoComponent} from "../entity-info/entity-info.component";
import {MarkdownComponent} from "../markdown/markdown.component";
import {EntityTypeLabelComponent} from "../entity-type-label/entity-type-label.component";
import {isSectionsNode, PageNode, SectionNode} from "../../route";


type Section = {
  section: SectionNode,
  isOpen: boolean,
  label: string
}


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

  @Input({required: true}) page?: PageNode;

  @Output() pageSelected = new EventEmitter<PageNode>();

  sections?: Section[];

  ngOnChanges(changes?: SimpleChanges) {

    if(isSectionsNode(this.page)) {
      this.sections = this.page.sections.map(section => ({
        section,
        label: section.path.replace(/-/g, ' '),
        isOpen: false
      }));
      return;
    }

    this.sections = undefined;
  }

  public toggleSection(section: Section): void {
    this.pageSelected.emit(section.section);
  }

  public closeSection(section: Section): void {
    console.log('CLOSE SECTION')
    console.log(section);
  }
}

