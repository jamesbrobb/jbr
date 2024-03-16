import {BehaviorSubject, Subject, tap} from "rxjs";
import {NavConfig, NavItemNode} from "./navigation.types";


export class NavigationService {

  readonly #navConfig: NavConfig;
  readonly #currentNodes = new BehaviorSubject<NavItemNode[]>([])
  readonly #selectedNode = new Subject<NavItemNode>();

  readonly currentNodes$ = this.#currentNodes.asObservable();
  readonly selectedNode$ = this.#selectedNode.asObservable();

  get nodes(): NavItemNode[] {
    return [...this.#navConfig];
  }

  constructor(config?: NavConfig) {
    this.#navConfig = config || [];
  }

  selectNode(node: NavItemNode): void {
    this.#selectedNode.next(node);
  }

  onUrlUpdate(url: string): void {

    if (!url) {
      return;
    }

    const newNodes = this.#getCurrentNodes(url);

    this.#setActive(newNodes);
    this.#currentNodes.next(newNodes);
  }

  #getCurrentNodes(url: string): NavItemNode[] {
    const frags: string[] = url.split(/(?=\/)/)
      .filter(value => !!value);

    let node: NavItemNode | undefined,
      nodes: NavItemNode[] = this.nodes,
      currentNodes: NavItemNode[] = [],
      frag: string = '';

    frags.map((frg: string, index: number) => {

      frag = `${frag}${frg}`;
      node = nodes.find((value: NavItemNode) => value.path === frag);

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

  #setActive(nodes: NavItemNode[]): void {

    this.#currentNodes.value.forEach((node) => {
      node.active = 0;
    });

    nodes.forEach((node, index) => {
      node.active = Math.min(index + 1, 2);
    });
  }
}
