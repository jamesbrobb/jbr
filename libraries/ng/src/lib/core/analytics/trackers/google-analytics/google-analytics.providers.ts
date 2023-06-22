import {InjectionToken, Provider} from '@angular/core';

import {AnalyticsAdaptorService} from "../../analytics.providers";
import {
  AnalyticsAdaptor,
  GaAnalyticsAdaptor,
  GaAnalyticsConfig
} from "@jbr/core";


export const GAConfigService = new InjectionToken<GaAnalyticsConfig>('GAConfigService');

export const GOOGLE_ANALYTICS_ADAPTOR_PROVIDER: Provider = {
  provide: AnalyticsAdaptorService,
  useFactory: (config: GaAnalyticsConfig): AnalyticsAdaptor => {
    return new GaAnalyticsAdaptor((window as any)?.gtag, config);
  },
  deps: [
    GAConfigService
  ]
}

