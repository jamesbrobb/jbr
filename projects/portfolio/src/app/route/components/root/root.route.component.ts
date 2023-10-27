import {Component, inject, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {isChildOf, PageNode, RouteNode} from "../../config/route-config.types";
import {PageContainerComponent} from "../../../components/page-container/page-container.component";



@Component({
  selector: 'app-root-route',
  standalone: true,
  templateUrl: './root.route.component.html',
  imports: [
    NgIf,
    PageContainerComponent
  ],
  styleUrls: ['./root.route.component.scss']
})
export class RootRouteComponent implements OnInit {

  public routeNodes?: RouteNode[];
  public detailsURI?: string;

  #router = inject(Router);
  #route = inject(ActivatedRoute);

  ngOnInit() {
    this.#route.data.subscribe(this._handlePageChange);
  }

  public onRouteSelected(node: RouteNode): void {

    // loop through routeNodes and build path
    // check if node is node
    // check if node is child of node

    if(!this.routeNodes) {
      return;
    }

    let found = false;

    const nodes = this.routeNodes.filter((routeNode: RouteNode) => {
      if(found) {
        return false;
      }

      found = isChildOf(routeNode, node);

      return true;
    });

    this.#router.navigate([...nodes.map(node => node.path), node.path]);
  }

  private _handlePageChange = (data: Data): void => {
    this.routeNodes = data['routeNodes'];
    console.log('routeNodes', this.routeNodes);
    // TODO - this.detailsURI = this._getDetailsURI(this.page);
    // need to retrieve details URI from another loaded config
  }
}
