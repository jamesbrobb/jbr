import {Component, inject, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {isPageNode, PageNode} from "../../config/route-config";
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

  public page?: PageNode;

  #router = inject(Router);
  #route = inject(ActivatedRoute);

  ngOnInit() {
    this.#route.data.subscribe(this._handlePageChange);
  }

  public onPageSelected(page: PageNode): void {
    this.#router.navigate([page.path], {relativeTo: this.#route});
  }

  private _handlePageChange = (data: Data): void => {
    const config = data['config'];
    this.page = isPageNode(config) ? config : undefined;
  }
}
