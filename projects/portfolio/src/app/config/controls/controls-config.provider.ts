import {EnvironmentProviders, InjectionToken, makeEnvironmentProviders} from "@angular/core";
import {ControlsConfigParser, ControlsOptionsMap} from "./controls-config.parser";


enum TEMP_OVERLAY_COLORS {
  BLUE= 'blue',
  DARK_BLUE= 'dark-blue',
  GREEN= 'green',
  RED= 'red',
  PURPLE= 'purple',
  PINK= 'pink',
  GREY= 'grey'
}

enum TEMP_FALLBACK_COLORS {
  BLUE= 'blue',
  GREEN= 'green',
  ORANGE= 'orange',
  PURPLE= 'purple',
  WHITE= 'white'
}


export const ControlsOptionsMapService = new InjectionToken<ControlsOptionsMap>('ControlsOptionsMapService');



export function getControlsProviders(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: ControlsConfigParser,
    useFactory: (optionsMap: ControlsOptionsMap) => {
      return new ControlsConfigParser(optionsMap);
    },
    deps: [
      ControlsOptionsMapService
    ]
  }, {
    provide: ControlsOptionsMapService,
    useValue: {
      OVERLAY_COLORS: Object.values(TEMP_OVERLAY_COLORS).map(key => ({value: key})),
      FALLBACK_COLORS: [{label: 'none'}, ...Object.values(TEMP_FALLBACK_COLORS).map(key => ({value: key}))],
      IMAGE_URLS: [
        {label: 'none'},
        {value: '/assets/media-examples/sample.png', label: 'Image 1'},
        {value: '/assets/media-examples/sample_2.png', label: 'Image 2'}
      ]
    }
  }])
}
