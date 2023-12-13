import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {EntityInfoComponent} from "../entity-info/entity-info.component";
import {EntityTypeLabelComponent} from "../entity-type-label/entity-type-label.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {toClassCasePipe} from "@jbr/ui";
import {InfoNode, PageNode} from "../../route";

@Component({
  selector: 'jbr-page-sections',
  standalone: true,
  imports: [CommonModule, EntityInfoComponent, EntityTypeLabelComponent, MatExpansionModule, toClassCasePipe],
  templateUrl: './page-sections.component.html',
  styleUrls: ['./page-sections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageSectionsComponent {

  @Input({required: true}) sections?: PageNode[];
  @Input({required: true}) section?: PageNode;
  @Input() info?: InfoNode;

  @Output() sectionSelected = new EventEmitter<PageNode | undefined>();
  @Output() infoSelected = new EventEmitter<InfoNode>();

  onSectionOpened(section: PageNode): void {

    if(section === this.section) {
      return;
    }

    this.sectionSelected.emit(section);
  }

  onSectionClosed(section: PageNode): void {

    if(section !== this.section) {
      return;
    }

    this.sectionSelected.emit();
  }

  onInfoSelected(info: InfoNode): void {
    this.infoSelected.emit(info);
  }
}
