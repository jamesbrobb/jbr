import {InjectionToken, Provider} from '@angular/core';

import {AnalyticsAdaptorService} from "../../analytics.providers";
import {
  AnalyticsAdaptor,
  GaAnalyticsAdaptor,
  GaAnalyticsConfig
} from "@jamesbenrobb/core";


export const GAConfigService = new InjectionToken<GaAnalyticsConfig>('GAConfigService');

export function getGoogleAnalyticsAdaptor(): Provider {
  return {
    provide: AnalyticsAdaptorService,
    useFactory: (config: GaAnalyticsConfig): AnalyticsAdaptor => {
      return new GaAnalyticsAdaptor((window as any)?.gtag, config);
    },
    deps: [
      GAConfigService
    ]
  }
}

