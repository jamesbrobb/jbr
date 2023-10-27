import {inject} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn, ResolveFn, Router,
  RouterStateSnapshot,
  Routes,
  UrlTree
} from '@angular/router';

import {RoutesConfig} from './config/route-config'
import {RouteNode, isRedirectNode} from "./config/route-config.types";
import {RootRouteComponent} from "./components/root/root.route.component";


const shouldRedirect: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const router = inject(Router),
    routesConfig = inject(RoutesConfig),
    routeNodes = routesConfig.getRouteNodesByPath(state.url) || [],
    routeNode = routeNodes[routeNodes.length - 1];

  if(isRedirectNode(routeNode)) {
    return router.parseUrl(routeNode.redirectTo);
  }

  return true
}


const getRouteNodes: ResolveFn<RouteNode[] | undefined> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): RouteNode[] | undefined => {
  const routeNodeConfig = inject(RoutesConfig);
  return routeNodeConfig.getRouteNodesByPath(state.url);
}


export const APP_ROUTES: Routes = [
  {
    path: '**',
    component: RootRouteComponent,
    canActivate: [shouldRedirect],
    resolve: {
      routeNodes: getRouteNodes
    }
  },
]
