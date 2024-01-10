import { ApplicationConfig } from '@angular/core';
import {
  getComponentLoaderProviders,
  ComponentLoaderMapService
} from "@jamesbenrobb/ui";


export const appConfig: ApplicationConfig = {
  providers: [
    getComponentLoaderProviders(),
    {
      provide: ComponentLoaderMapService,
      useValue: {
        scam: {
          import: () => import('./components/scam.component'),
          standalone: false
        },
        'scam-default':{
          import: () => import('./components/scam-default.component'),
          standalone: false,
          isDefaultExport: true
        },
        standalone: () => import('./components/standalone.component')
      },
      multi: true
    }
  ]
};
