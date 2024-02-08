import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {AnalyticsActions, ConfigLoader} from "@jamesbenrobb/core";
import {AnalyticsActionsService} from "../../core";
import {AppConfig} from "../app/app-config.providers";


const KEY = 'analytics';

type CONFIG = { [KEY]: AnalyticsActions }


export function getAnalyticsConfigProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: AnalyticsActionsService,
    useFactory: (appConfig: ConfigLoader<CONFIG>) => {
      return appConfig.getValueByKey(KEY);
    },
    deps: [AppConfig]
  }])
}
