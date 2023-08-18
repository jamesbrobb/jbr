import {Component, inject, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {ActivatedRoute, Data} from "@angular/router";
import {Page, PagesConfig} from "../../../config/page/page-config";
import {isPageNode} from "../../config/route-config";
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

  public page?: Page;
  public detailsURI?: string;

  #route = inject(ActivatedRoute);
  #pagesConfig = inject(PagesConfig)

  ngOnInit() {
    this.#route.data.subscribe(this._handlePageChange);
  }

  private _handlePageChange = (data: Data): void => {

    const config = data['config'];

    console.log('config', config);

    if(isPageNode(config)) {
      this.page = config.page;
      this.detailsURI = config.detailsURI;
        //this.#pagesConfig.getPageConfigById(config.pageId)
    }
  }
}
