import {APP_INITIALIZER, EnvironmentProviders, InjectionToken, makeEnvironmentProviders} from "@angular/core";
import {ConfigLoader} from "@jamesbenrobb/core";


export const AppConfig = new InjectionToken<ConfigLoader<any>>('AppConfig');


export function getAppConfigProviders<T extends {[key: PropertyKey]: unknown}>(configPath: string): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: APP_INITIALIZER,
    useFactory: (appConfig: ConfigLoader<T>) => {
      return () => appConfig.load();
    },
    deps: [AppConfig],
    multi: true
  }, {
    provide: AppConfig,
    useValue: new ConfigLoader<T>(configPath)
  }]);
}
