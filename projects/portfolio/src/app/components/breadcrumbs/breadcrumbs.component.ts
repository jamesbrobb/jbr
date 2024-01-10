import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {isPageNode, RouteNode} from "../../route";
import {NgForOf, NgIf} from "@angular/common";
import {GuardTypePipe} from "@jamesbenrobb/ui";


@Component({
  selector: 'jbr-breadcrumbs',
  standalone: true,
  imports: [
    NgForOf,
    GuardTypePipe,
    NgIf
  ],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent {

  @Input({required: true}) routeNodes?: RouteNode[];
  @Output() breadCrumbSelected = new EventEmitter<RouteNode>()

  isPageNode = isPageNode;

  selectNode(node: RouteNode) {
    this.breadCrumbSelected.emit(node);
  }
}
