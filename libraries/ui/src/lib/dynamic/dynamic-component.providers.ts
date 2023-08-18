import {EnvironmentProviders, Injector, makeEnvironmentProviders} from "@angular/core";
import {
  DynamicComponentModuleMap,
  DynamicComponentModuleMapService,
  DynamicComponentService
} from "./dynamic-component.service";

export function getDynamicComponentProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: DynamicComponentService,
    useFactory: (inj: Injector, map: DynamicComponentModuleMap) => {
      return new DynamicComponentService(inj, map)
    },
    deps: [
      Injector,
      DynamicComponentModuleMapService
    ]
  }]);
}
