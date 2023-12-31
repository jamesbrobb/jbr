import {filter} from "rxjs";

import {
  Component,
  Output,
  EventEmitter,
  Inject
} from '@angular/core';
import {NgClass} from "@angular/common";
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeModule, MatTreeNestedDataSource} from '@angular/material/tree';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NavigationEnd, Router, RouterEvent, RouterLink} from "@angular/router";

import {openClose, rotate} from "@jbr/ui";

import {MenuConfig, MenuConfigService, MenuItemNode} from "../../config/menu/menu-config";


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  standalone: true,
  imports: [
    MatIconModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    NgClass
  ],
  animations: [
    openClose({timings: '0.3s'}),
    rotate()
  ]
})
export class SideMenuComponent {

  @Output() menuItemSelected = new EventEmitter();

  private readonly _router: Router;
  private _currentNodes?: MenuItemNode[];

  readonly treeControl = new NestedTreeControl<MenuItemNode>(node => node.children);
  readonly dataSource = new MatTreeNestedDataSource<MenuItemNode>();

  constructor(router: Router, @Inject(MenuConfigService) config: MenuConfig) {

    this._router = router;
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(this._handleRouteChange);

    this.dataSource.data = config;
    this.treeControl.dataNodes = config;
  }

  hasChild = (_: number, node: MenuItemNode) => !!node.children && node.children.length > 0;

  public onItemClick(node: MenuItemNode): void {
    this._router.navigate([node.path]);
    this.menuItemSelected.emit();
  }

  public onGroupClick(node: MenuItemNode): void {

    if(!this.treeControl.isExpanded(node)) {
      this.treeControl.collapseDescendants(node);
    }

    if(!node.hasContent) {
      return;
    }

    this._router.navigate([node.path]);
  }

  private _handleRouteChange = (event: any): void => {

    const rEvt: RouterEvent = event as RouterEvent,
      nodes: MenuItemNode[] = this._getCurrentNodes(rEvt.url);

    this._setExpanded(nodes);
    this._setActive(nodes);

    this._currentNodes = nodes;
  }

  private _getCurrentNodes(url: string): MenuItemNode[] {

    const frags: string[] = url.split(/(?=\/)/)
                               .filter(value => !!value);

    let node: MenuItemNode | undefined,
      nodes: MenuItemNode[] = this.treeControl.dataNodes,
      currentNodes: MenuItemNode[] = [],
      frag: string = '';

    frags.map((frg: string, index: number) => {

      frag = `${frag}${frg}`;
      node = nodes.find((value: MenuItemNode) => value.path === frag);

      if(!node) {
        return;
      }

      currentNodes.unshift(node);

      if(!node.children) {
        return;
      }

      nodes = node.children;
    });

    return currentNodes;
  }

  private _setExpanded(nodes: MenuItemNode[]): void {

    if(this._currentNodes) {
      this._currentNodes
        .filter((node) => !nodes.find((nd) => nd === node))
        .forEach((node) => {
          this.treeControl.collapse(node);
        });
    }

    nodes.forEach((node) => {
      if(!this.treeControl.isExpanded(node)){
        this.treeControl.expand(node);
      }
    })
  }

  private _setActive(nodes: MenuItemNode[]): void {

    if(this._currentNodes) {
      this._currentNodes.forEach((node) => {
        node.active = 0;
      })
    }

    nodes.reverse().forEach((node, index) => {
      node.active = index + 1;
    })
  }
}
