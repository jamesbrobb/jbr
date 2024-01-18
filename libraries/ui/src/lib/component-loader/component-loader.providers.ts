import {EnvironmentProviders, InjectionToken, Injector, makeEnvironmentProviders} from "@angular/core";
import {
  ComponentLoaderMap,
  ComponentLoaderService
} from "./component-loader.service";


export const ComponentLoaderMapService = new InjectionToken<ComponentLoaderMap>('ComponentLoaderMapService');

export const COMPONENT_LOADER_SERVICE_PROVIDER = {
  provide: ComponentLoaderService,
  useFactory: (inj: Injector, map: ComponentLoaderMap) => {
    return new ComponentLoaderService(inj, map);
  },
  deps: [
    Injector,
    ComponentLoaderMapService
  ]
}

export function getComponentLoaderProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([COMPONENT_LOADER_SERVICE_PROVIDER]);
}
