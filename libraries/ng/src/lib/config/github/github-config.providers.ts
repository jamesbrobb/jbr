import {EnvironmentProviders, InjectionToken, makeEnvironmentProviders} from "@angular/core";
import {ConfigLoader} from "@jamesbenrobb/core";
import {GithubConfig} from "./github-config";
import {AppConfig} from "../app/app-config.providers";


const KEY = 'github-config';

type CONFIG = { [KEY]: GithubConfig }


export const githubConfigService = new InjectionToken<GithubConfig>('githubConfigService');


export function getGithubConfigProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: githubConfigService,
    useFactory: (appConfig: ConfigLoader<CONFIG>) => {
      return appConfig.getValueByKey(KEY);
    },
    deps: [AppConfig]
  }])
}
