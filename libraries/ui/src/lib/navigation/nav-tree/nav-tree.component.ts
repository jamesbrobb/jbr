import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, effect, EventEmitter,
  inject,
  input,
  Output,
} from '@angular/core';

import {NgClass} from "@angular/common";
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeModule, MatTreeNestedDataSource} from '@angular/material/tree';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

import {openClose, rotate} from "../../animation";
import {NavItemNode} from "../navigation.types";


@Component({
  selector: 'jbr-nav-tree',
  standalone: true,
  imports: [
    MatIconModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    NgClass
  ],
  templateUrl: './nav-tree.component.html',
  styleUrl: './nav-tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    openClose({timings: '0.3s'}),
    rotate()
  ]
})
export class NavTreeComponent {

  readonly navNodes = input<NavItemNode[]>();
  readonly currentNodes = input<NavItemNode[]>();

  @Output() nodeSelected = new EventEmitter<NavItemNode>();

  #changeDetectorRef = inject(ChangeDetectorRef);
  #currentNodes?: NavItemNode[];

  protected readonly treeControl = new NestedTreeControl<NavItemNode>(node => node.children);
  protected readonly dataSource = new MatTreeNestedDataSource<NavItemNode>();

  protected readonly hasChild = (_: number, node: NavItemNode) => !!node.children && node.children.length > 0;

  constructor() {
    effect(() => {
      const nodes = this.navNodes() || [];
      this.dataSource.data = nodes;
      this.treeControl.dataNodes = nodes;
    });
    effect(() => {
      const nodes = this.currentNodes() || [];
      this.#currentNodesUpdated(nodes);
    })
  }

  #currentNodesUpdated(nodes: NavItemNode[]): void {

    this.#setExpanded(nodes);
    this.#setActive(nodes);

    this.#currentNodes = nodes;
    this.#changeDetectorRef.detectChanges();
  }

  onItemClick(node: NavItemNode): void {
    this.nodeSelected.emit(node);
  }

  onGroupClick(node: NavItemNode): void {

    if(!node.hasContent) {
      return;
    }

    this.nodeSelected.emit(node);
  }

  toggleGroup(node: NavItemNode): void {
    this.treeControl.toggle(node);
  }

  #setExpanded(nodes: NavItemNode[]): void {

    nodes.forEach((node, index) => {

      if(index === 0) {

        if(!node.children) {
          return;
        }

        if(this.#currentNodes && this.#currentNodes.indexOf(node) !== -1) {

          if(this.treeControl.isExpanded(node)) {
            this.treeControl.collapse(node);
          }

        } else {

          if(!this.treeControl.isExpanded(node)) {
            this.treeControl.expand(node);
          }
        }

        return;
      }

      if(!this.treeControl.isExpanded(node)){
        this.treeControl.expand(node);
      }
    });

    if(this.#currentNodes) {
      this.#currentNodes
        .filter((node) => !nodes.find((nd) => nd === node))
        .forEach((node) => {
          this.treeControl.collapse(node);
        });
    }
  }

  #setActive(nodes: NavItemNode[]): void {

    if(this.#currentNodes) {
      this.#currentNodes.forEach((node) => {
        node.active = 0;
      });
    }

    nodes.forEach((node, index) => {
      node.active = Math.min(index + 1, 2);
    });
  }
}
