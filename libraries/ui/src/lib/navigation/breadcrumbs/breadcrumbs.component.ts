import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Output,
} from '@angular/core';

import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {GuardTypePipe, toWordsPipe} from "../../pipes";
import {NavItemNode} from "../navigation.types";


@Component({
  selector: 'jbr-breadcrumbs',
  standalone: true,
  imports: [
    NgForOf,
    GuardTypePipe,
    NgIf,
    toWordsPipe,
    NgTemplateOutlet
  ],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsComponent {

  readonly navItemNodes = input<NavItemNode[]>();

  @Output() nodeSelected = new EventEmitter<NavItemNode>()

  selectNode(node: NavItemNode) {
    this.nodeSelected.emit(node);
  }
}
