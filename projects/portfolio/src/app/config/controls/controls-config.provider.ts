import {InjectionToken} from "@angular/core";
import {ControlsConfigParser, ControlsOptionsMap} from "./controls-config.parser";



export const ControlsOptionsMapService = new InjectionToken<ControlsOptionsMap>('ControlsOptionsMapService');

export const CONTROLS_PROVIDER = {
  provide: ControlsConfigParser,
  useFactory: (optionsMap: ControlsOptionsMap) => {
    return new ControlsConfigParser(optionsMap);
  },
  deps: [
    ControlsOptionsMapService
  ]
}
