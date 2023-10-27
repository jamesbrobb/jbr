import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {ROUTES_CONFIG_KEY, RoutesConfig} from "./route-config";
import {Config} from "../../config/config";
import {AppConfig} from "../../config/app-config";
import {RouteNode} from "./route-config.types";


export function getRouteConfigProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: RoutesConfig,
    useFactory: (appConfig: Config) => {
      let config = appConfig.getValueByKey<RouteNode[]>(ROUTES_CONFIG_KEY);
      return new RoutesConfig(config);
    },
    deps: [AppConfig]
  }])
}
