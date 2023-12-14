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
  getCurrentPageNode,
  InfoNode,
  isInfoNode,
  isPageNode,
  isSectionsNode,
  PageNode,
  RouteNode,
} from "../../route";
import {MatDividerModule} from "@angular/material/divider";
import {PageSectionsComponent} from "../page-sections/page-sections.component";
import {BreadcrumbsComponent} from "../breadcrumbs/breadcrumbs.component";


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
        PageSectionsComponent,
        BreadcrumbsComponent
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
  section?: PageNode;
  info?: InfoNode;

  sections?: PageNode[];

  ngOnChanges(changes?: SimpleChanges) {

    this.page = undefined;
    this.section = undefined;
    this.info = undefined;
    this.sections = undefined;

    if(!this.routeNodes || !this.routeNodes.length) {
      return;
    }

    this.page = getCurrentPageNode(this.routeNodes);

    if(!this.page) {
      return;
    }

    const nodeIndex = this.routeNodes.indexOf(this.page),
        nodes = this.routeNodes.slice(nodeIndex + 1),
        child1 = nodes.at(0),
        child2 = nodes.at(1);

    if(isSectionsNode(this.page)) {
      this.sections = this.page.sections;
      this.section = child1 ? isPageNode(child1) ? child1 : undefined : undefined;
      this.info = child2 ? isInfoNode(child2) ? child2 : undefined : undefined;
    } else {
      this.info = this.info = child1 ? isInfoNode(child1) ? child1 : undefined : undefined;
    }
  }

  onRouteSelected(node: RouteNode | undefined): void {
    this.routeSelected.emit(node || this.page);
  }
}
