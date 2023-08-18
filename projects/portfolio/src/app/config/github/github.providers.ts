import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {Config} from "../config";
import {AppConfig} from "../app-config";
import {GithubConfig, githubConfigService} from "./github-config";

export function getGithubProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: githubConfigService,
    useFactory: (appConfig: Config) => {
      return appConfig.getValueByKey<GithubConfig>('github-config');
    },
    deps: [AppConfig]
  }])
}
