import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {Config} from "../config";
import {RouteNode, ROUTES_CONFIG_KEY} from "../../route";
import {AppConfig} from "../app-config";
import {menuConfigFactory, MenuConfigService} from "./menu-config";


export function getMenuProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: MenuConfigService,
    useFactory: (appConfig: Config) => {
      let config = appConfig.getValueByKey<RouteNode[]>(ROUTES_CONFIG_KEY);
      return menuConfigFactory(config);
    },
    deps: [AppConfig]
  }])
}
