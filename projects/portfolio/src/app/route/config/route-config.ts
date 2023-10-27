import {
  RouteNode,
  isRouteNodeArray,
  getChildNodes
} from "./route-config.types";


export const ROUTES_CONFIG_KEY: string = 'routes';


export class RoutesConfig {

  constructor(
    private _config: RouteNode[]
  ) {}

  getRouteNodesByPath(path: string): RouteNode[] | undefined {

    const parts = path === '/' ? [path] : path.split('/').filter(part => !!part);

    return this.#getNodesForPath(parts, this._config);
  }

  #getNodesForPath(parts: string[], nodes: RouteNode[]): RouteNode[] | undefined {

    let childNodes: RouteNode[] = nodes;

    const resNodes = parts.map((part, index) => {

      let routeNode = childNodes.find(node => node.path === part);

      childNodes = [];

      if(!routeNode) {
        return;
      }

      if(parts.length !== (index + 1)) {
        childNodes = getChildNodes(routeNode);
      }

      return routeNode;
    });

    if(!isRouteNodeArray(resNodes)) {
      return;
    }

    return resNodes;
  }
}
