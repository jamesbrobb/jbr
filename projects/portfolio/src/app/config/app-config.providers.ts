import {APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";

import {AppConfig} from "./app-config";
import {Config} from "./config";
import {getSVGProviders} from "./svg/svg.initialiser";
import {getControlsProviders} from "./controls/controls-config.provider";
import {getMenuProviders} from "./menu/menu.providers";
import {getGithubProviders} from "./github/github.providers";
import {getAnalyticsProviders} from "./analytics/analytics.providers";
import {getRouteConfigProviders} from "../route/config/route-config.providers";


export function getAppConfigProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([
    getControlsProviders(),
    getGithubProviders(),
    getAnalyticsProviders(),
    getMenuProviders(),
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
