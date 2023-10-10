import {TypeGuard} from "@jbr/types";

export type RouteConfig = RouteNode[];

export type RouteNode = RedirectNode | ParentNode | PageNode | SectionsNode | SectionNode | InfoNode

export type RouteNodeBase = {
  path: string
}

export type RedirectNode = {
  redirectTo: string
} & RouteNodeBase

export type ParentNode = {
  children: (RedirectNode | ParentNode | PageNode)[]
} & RouteNodeBase

export type PageNode = {
  description: string
  githubLink: string
  type: string
} & RouteNodeBase

export type SectionsNode = {
  sections: SectionNode[]
} & PageNode

export type SectionNode = {
  info: InfoNode[]
} & PageNode

export type InfoNode = {
  name: string
  uri: string
} & RouteNodeBase


type routeNodeGuardProp<NT> = NT extends RouteNode ? keyof Omit<NT, keyof RouteNodeBase> : never

function routeNodeGuard<NT extends RouteNode>(prop: routeNodeGuardProp<NT>): TypeGuard<RouteNode | undefined, NT> {
  return (node: RouteNode | undefined): node is NT => !!node && prop in node;
}

export const isRedirectNode = routeNodeGuard<RedirectNode>('redirectTo');
export const isParentNode = routeNodeGuard<ParentNode>('children');
export const isPageNode = routeNodeGuard<PageNode>('description');
export const isSectionsNode = routeNodeGuard<SectionsNode>('sections');
export const isSectionNode = routeNodeGuard<SectionNode>('info');
export const isInfoNode = routeNodeGuard<InfoNode>('uri');



export const ROUTES_CONFIG_KEY: string = 'routes';

export class RoutesConfig {

  constructor(
    private _config: RouteConfig
  ) {}

  getRouteNodeByPath(path: string): RouteNode | undefined {
    console.log('path', path)
    const parts = path === '/' ? [path] : path.split('/').filter(part => !!part);

    let config: RouteConfig | undefined = this._config,
      routeNode: RouteNode | undefined;

    parts.map(part => {
      console.log('=======================================')
      console.log('part', part)
      routeNode = config?.find(rConf => rConf.path === part);
      console.log('routeNode', routeNode)
      config = isParentNode(routeNode) ? routeNode.children : undefined;
      console.log(isPageNode(routeNode) && isSectionsNode(routeNode))
      // check if page has sections
      // if so, check if the next part is a section
        // if previous part is a section, check if the next part is a page? api, example etc
      // if so return page
      // does 'path' property need to be moved to page?
      // sections are pages
      // so a page can have either children or sections
      // so should api, example etc also be page objects in sections? No, they are not pages
      console.log('config', config)
      console.log('=======================================')
    });

    return routeNode;
  }

  #getIt(parts: string[]): RouteNode | undefined {
    return
  }
}
