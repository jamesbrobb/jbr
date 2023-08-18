import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {PAGES_CONFIG_KEY, PagesConfig, PagesConfigMap} from "./page-config";
import {Config} from "../config";
import {ControlsConfigParser} from "../controls/controls-config.parser";
import {AppConfig} from "../app-config";

export function getPageProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: PagesConfig,
    useFactory: (appConfig: Config, parser: ControlsConfigParser) => {
      let config = appConfig.getValueByKey<PagesConfigMap>(PAGES_CONFIG_KEY);
      return new PagesConfig(config, parser);
    },
    deps: [AppConfig, ControlsConfigParser]
  }])
}
