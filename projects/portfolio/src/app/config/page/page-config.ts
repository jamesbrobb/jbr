import {ControlGroup} from "../controls/controls-config";
import {ControlsConfigParser} from "../controls/controls-config.parser";


export type Page = {
  name: string;
  githubLink?: string;
  type: string;
  description: string;
  example?: string;
  api?: string;
  sections?: Page[];
}

export type Section = {
  isOpen: boolean;
  label?: string;
  readonly page: Page;
}

export type PageConfig = {
  detailsURI?: string,
  controls?: ControlGroup[],
  examples?: string[],
  sections?: Section[]
}

export type PagesConfigMap = {[pageId: string]: PageConfig};


export const PAGES_CONFIG_KEY: string = 'pages';

export class PagesConfig {

  constructor(
    private _pagesConfig: PagesConfigMap,
    private _controlsParser: ControlsConfigParser
  ) {}

  getPageConfigById(id: string): PageConfig | undefined {

    const page = this._pagesConfig[id];

    if(page && page.controls) {
      this._controlsParser.parseOptions(page.controls);
    }

    return page;
  }
 }
