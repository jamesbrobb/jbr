import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {AnalyticsActionsService, GAConfigService} from "@jbr/ng";
import {Config} from "../config";
import {AnalyticsActions, GaAnalyticsConfig} from "@jbr/core";
import {AppConfig} from "../app-config";


export function getAnalyticsProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: GAConfigService,
    useFactory: (appConfig: Config) => {
      return appConfig.getValueByKey<GaAnalyticsConfig>('ga-analytics');
    },
    deps: [AppConfig]
  }, {
    provide: AnalyticsActionsService,
    useFactory: (appConfig: Config) => {
      return appConfig.getValueByKey<AnalyticsActions>('analytics');
    },
    deps: [AppConfig]
  }])
}
