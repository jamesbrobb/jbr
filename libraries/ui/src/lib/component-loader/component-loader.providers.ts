import {EnvironmentProviders, InjectionToken, Injector, makeEnvironmentProviders} from "@angular/core";
import {
  ComponentLoaderMap,
  ComponentLoaderService
} from "./component-loader.service";


export const ComponentLoaderMapService = new InjectionToken<ComponentLoaderMap>('ComponentLoaderMapService');

export function getComponentLoaderProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: ComponentLoaderService,
    useFactory: (inj: Injector, map: ComponentLoaderMap) => {
      return new ComponentLoaderService(inj, map);
    },
    deps: [
      Injector,
      ComponentLoaderMapService
    ]
  }]);
}
