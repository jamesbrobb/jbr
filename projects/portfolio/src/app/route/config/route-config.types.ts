import {TypeGuard} from "@jbr/types";
import {ControlGroup} from "../../config/controls/controls-config";


export type RouteNode = RedirectNode | ParentNode | PageNode | SectionsNode | InfoNode

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
  label: string
  description: string
  githubLink: string
  type: string
  isModule: boolean
  demonstrates?: string
  controls?: ControlGroup[]
} & RouteNodeBase

export type PageNodeWithInfo = {
  info: InfoNode[]
} & PageNode;

export type SectionsNode = {
  sections: PageNode[]
} & PageNode

export type InfoNode = {
  name: string
  uri: string
  isExample: boolean
} & RouteNodeBase


type routeNodeGuardProp<NT extends RouteNode> = keyof Omit<NT, keyof RouteNodeBase>

function routeNodeGuard<NT extends RouteNode>(...props: routeNodeGuardProp<NT>[]): TypeGuard<RouteNode, NT> {
  return (node?: RouteNode): node is NT => !!node && props.every(prop => prop in node)
}


type ObjectLiteral = {[key: PropertyKey]: unknown}

type TypeGuardFunction<T, NT extends T> = (arg: T) => arg is NT
type TypeGuardFunctionProp<T, NT extends T, O extends ObjectLiteral = {}> = keyof Omit<NT, keyof O>

function typeGuardByProps<T, NT extends T, O extends ObjectLiteral = {}>(
  ...props: TypeGuardFunctionProp<T, NT, O>[]
): TypeGuardFunction<T, NT> {

  return (arg: T): arg is NT => {
    if(!!arg && typeof arg === 'object') {
      return props.every(prop => prop in arg);
    }
    return false;
  }
}

function arrayTypeGuardByProps<T, NT extends T, O extends ObjectLiteral = {}>(
  ...props: TypeGuardFunctionProp<T, NT, O>[]
): TypeGuardFunction<T[], NT[]> {

  return (nodes: T[]): nodes is NT[] => {
    if(Array.isArray(nodes)) {
      return nodes.every(node => typeGuardByProps<T, NT, O>(...props)(node));
    }
    return false;
  }
}

export const isRouteNodeArray = (arg: unknown[]): arg is RouteNode[] => {
  return arg.every(node => isRouteNode(node));
}
export const isRouteNode = (arg: unknown): arg is RouteNode => {
  return !!arg && typeof arg === 'object' && 'path' in arg;
}
export const isRedirectNode = routeNodeGuard<RedirectNode>('redirectTo');
export const isParentNode = routeNodeGuard<ParentNode>('children');
export const isPageNode = routeNodeGuard<PageNode>('description');
const _isPageNodeWithInfo = routeNodeGuard<PageNodeWithInfo>('info');
export const isPageNodeWithInfo: TypeGuard<RouteNode, PageNodeWithInfo> = (node: RouteNode): node is PageNodeWithInfo => {
  return isPageNode(node) && _isPageNodeWithInfo(node);
}
export const isSectionsNode = routeNodeGuard<SectionsNode>('sections');
export const isInfoNode = routeNodeGuard<InfoNode>('name', 'uri');

export function getChildNodes(node: RouteNode): RouteNode[] {
  let childNodes: RouteNode[] = [];

  if(isPageNodeWithInfo(node)) {
    childNodes = childNodes.concat(node.info);
  }

  if(isSectionsNode(node)) {
    childNodes = childNodes.concat(node.sections);
  }

  if(isParentNode(node)) {
    childNodes = childNodes.concat(node.children);
  }

  return childNodes;
}

export function isChildOf(parentNode: RouteNode, childNode: RouteNode): boolean {

  const childNodes = getChildNodes(parentNode);

  return childNodes.some(node => node === childNode);
}

export function getCurrentPageNode(routeNodes: RouteNode[]): PageNode | undefined {
  let node: RouteNode | undefined;
  const rnLength = routeNodes.length;

  if(rnLength === 1 && isPageNode(routeNodes[0])) {
    node = routeNodes[0]
  }

  if(rnLength > 1) {
    const ancestors = routeNodes.filter(isParentNode),
        ancLength = ancestors.length;

    if(ancLength === rnLength) {

      node = routeNodes[rnLength - 1];

    } else {

      if(ancLength > 0) {

        node = ancestors[ancLength - 1];

        const index = routeNodes.indexOf(node),
            child =  routeNodes[index + 1];

        if(isPageNode(child) && node.children.indexOf(child) > -1) {
          node = child;
        }
      }
    }
  }

  return node ? isPageNode(node) ? node : undefined : undefined;
}
