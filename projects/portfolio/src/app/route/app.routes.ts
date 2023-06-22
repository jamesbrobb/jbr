import {inject} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivateFn, ResolveFn, Router,
  RouterModule,
  RouterStateSnapshot,
  Routes,
  UrlTree
} from '@angular/router';

import {isRedirectNode, RouteNode, RoutesConfig} from "./config/route-config";
import {RootRouteComponent} from "./components/root/root.route.component";



const shouldRedirect: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
  const router = inject(Router),
    routesConfig = inject(RoutesConfig),
    routeNode = routesConfig.getRouteNodeByPath(state.url);

  if(isRedirectNode(routeNode)) {
    return router.parseUrl(routeNode.redirectTo);
  }

  return true
}

const getRouteConfig: ResolveFn<RouteNode | undefined> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): RouteNode | undefined => {
  const routesConfig = inject(RoutesConfig);
  return routesConfig.getRouteNodeByPath(state.url);
}



export const APP_ROUTES: Routes = [
  {
    path: '**',
    component: RootRouteComponent,
    canActivate: [shouldRedirect],
    resolve: {
      config: getRouteConfig
    }
  },
]
