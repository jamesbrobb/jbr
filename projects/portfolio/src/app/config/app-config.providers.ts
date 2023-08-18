import {APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {AnalyticsActionsService, GAConfigService} from "@jbr/ng";
import {AnalyticsActions, GaAnalyticsConfig} from "@jbr/core";

import {AppConfig} from "./app-config";
import {PAGES_CONFIG_KEY, PagesConfig, PagesConfigMap} from "./page/page-config";
import {ControlsConfigParser} from "./controls/controls-config.parser";

import {RouteConfig, ROUTES_CONFIG_KEY, RoutesConfig} from "../route";
import {Config} from "./config";
import {getSVGProviders} from "./svg/svg.initialiser";
import {getControlsProviders} from "./controls/controls-config.provider";
import {getMenuProviders} from "./menu/menu.providers";
import {getGithubProviders} from "./github/github.providers";
import {getAnalyticsProviders} from "./analytics/analytics.providers";
import {getPageProviders} from "./page/page.providers";
import {getRouteConfigProviders} from "../route/config/route-config.providers";





export function getAppConfigProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([
    getControlsProviders(),
    getGithubProviders(),
    getAnalyticsProviders(),
    getMenuProviders(),
    getPageProviders(),
    getSVGProviders(),
    getRouteConfigProviders(),
    {
      provide: APP_INITIALIZER,
      useFactory: (appConfig: Config) => {
        return () => appConfig.load();
      },
      deps: [AppConfig],
      multi: true
    }, {
      provide: AppConfig,
      useValue: new Config('assets/json/config.json')
  }]);
}
