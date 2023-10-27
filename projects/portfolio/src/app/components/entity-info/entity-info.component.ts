import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

import {MatButtonModule} from "@angular/material/button";
import {MatTabsModule} from "@angular/material/tabs";
import {AnalyticsEventDirective, AnalyticsHrefListenerDirective} from "@jbr/ng";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {MarkdownModule} from "ngx-markdown";
import {
  ComponentLoaderIODirective,
  GuardTypePipe,
  ResponsiveContainerDirectiveModule,
  toClassCasePipe,
  toWordsPipe
} from "@jbr/ui";
import {ControlsLoaderDirective} from "../controls/controls-loader.directive";
import {ControlGroup} from "../../config/controls/controls-config";
import {MatIconModule} from "@angular/material/icon";
import {GithubBtnComponent} from "../github-btn/github-btn.component";
import {MarkdownComponent} from "../markdown/markdown.component";
import {EntityTypeLabelComponent} from "../entity-type-label/entity-type-label.component";
import {InfoNode, isSectionNode, PageNode} from "../../route";

@Component({
  selector: 'jbr-entity-info',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatButtonModule,
    MatTabsModule,
    MarkdownModule,
    AnalyticsEventDirective,
    AnalyticsHrefListenerDirective,
    ComponentLoaderIODirective,
    ControlsLoaderDirective,
    MatIconModule,
    GithubBtnComponent,
    MarkdownComponent,
    NgClass,
    ResponsiveContainerDirectiveModule,
    EntityTypeLabelComponent,
    toClassCasePipe,
    toWordsPipe,
    GuardTypePipe,
  ],
  templateUrl: './entity-info.component.html',
  styleUrls: ['./entity-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityInfoComponent implements OnChanges {

  @Input({required: true}) page?: PageNode;
  @Input() info?: InfoNode;
  @Output() infoSelectionChange = new EventEmitter<InfoNode>();

  selectedInfoIndex: number = 0;
  controls?: ControlGroup[];
  examples?: string[];
  controlData: {[key: string]: any} = {};

  isSectionNode = isSectionNode;

  ngOnChanges(changes: SimpleChanges) {

    if(!this.page) {
      return;
    }

    this.controlData = {};
    //this.controls = this.page?.controls;
    //this.examples = this.page?.examples;

    if(!isSectionNode(this.page) || !this.info) {
      return;
    }

    this.selectedInfoIndex = this.page.info.indexOf(this.info);
  }

  onControlDataChange(data: {[key: string]: any}): void {
    this.controlData = data;
    console.log('onControlDataChange', this.controlData);
  }

  onSelectedIndexChange(index: number): void {

    if(!this.page || !isSectionNode(this.page)) {
      return;
    }

    this.infoSelectionChange.emit(this.page.info[index]);
  }
}
