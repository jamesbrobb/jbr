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
import {
  InfoNode,
  isInfoNode,
  isPageNode,
  isSectionNode,
  isSectionsNode,
  PageNode,
  RouteNode,
  SectionNode
} from "../../route";
import {MatDividerModule} from "@angular/material/divider";
import {PageSectionsComponent} from "../page-sections/page-sections.component";


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
    toClassCasePipe,
    MatDividerModule,
    PageSectionsComponent
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

  @Input({required: true}) routeNodes?: RouteNode[];

  @Output() routeSelected = new EventEmitter<RouteNode>();

  page?: PageNode;
  section?: SectionNode;
  info?: InfoNode;

  sections?: SectionNode[];

  ngOnChanges(changes?: SimpleChanges) {

    const nodes = this.routeNodes?.concat().reverse();
    console.log('nodes', nodes);
    this.page = undefined;
    this.section = undefined;
    this.info = undefined;
    this.sections = undefined;

    if(!nodes || !nodes.length) {
      return;
    }

    nodes.forEach(node => {
      if(isInfoNode(node)) {
        this.info = node;
      }
      if(isSectionNode(node)) {
        this.section = node;
      }
      if(!this.page && !isSectionNode(node) && isPageNode(node)) {
        this.page = node;

        if(isSectionsNode(this.page)) {
          this.sections = this.page.sections;
        }
      }
    });
  }

  onSectionSelected(section: SectionNode | undefined): void {
    // TODO - navigate to current info of section
    this.routeSelected.emit(section || this.page);
  }

  onInfoSelected(info: InfoNode): void {
    this.routeSelected.emit(info);
  }
}

