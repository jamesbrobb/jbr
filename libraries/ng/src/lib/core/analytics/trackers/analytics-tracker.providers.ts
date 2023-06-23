import {Provider} from "@angular/core";
import {getGoogleAnalyticsAdaptor} from "./google-analytics/google-analytics.providers";


export enum AnalyticsTracker {
  GOOGLE
}

export function getAnalyticsTrackerProvider(type: AnalyticsTracker): Provider | undefined {
  switch(type) {
    case AnalyticsTracker.GOOGLE:
      return getGoogleAnalyticsAdaptor();
    default:
      return;
  }
}
