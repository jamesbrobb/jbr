import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {ConfigLoader, GaAnalyticsConfig} from "@jamesbenrobb/core";
import {GAConfigService} from "../../core";
import {AppConfig} from "../app/app-config.providers";


const KEY = 'ga-analytics';

type CONFIG = { [KEY]: GaAnalyticsConfig }


export function getGAAnalyticsConfigProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: GAConfigService,
    useFactory: (appConfig: ConfigLoader<CONFIG>) => {
      return appConfig.getValueByKey(KEY);
    },
    deps: [AppConfig]
  }])
}
