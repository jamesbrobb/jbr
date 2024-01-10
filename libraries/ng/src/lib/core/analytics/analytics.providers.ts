import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
  Optional, Provider
} from '@angular/core';
import {
  AnalyticsActions,
  AnalyticsService,
  AnalyticsAdaptor,
  AnalyticsHook
} from "@jamesbenrobb/core";
import {CommandGroup, CommandProcessor} from "@jamesbenrobb/core";
import {ANALYTICS_ROUTER_PROVIDER} from "./router/analytics-router.provider";
import {AnalyticsTracker, getAnalyticsTrackerProvider} from "./trackers";



export const AnalyticsActionsService = new InjectionToken<AnalyticsActions>('AnalyticsActionsService');
export const AnalyticsAdaptorService = new InjectionToken<AnalyticsAdaptor>('AnalyticsAdaptorService');

/*
  usage

  {
    provide: AnalyticsHooksService,
    useValue:[...some analytics hooks],
    multi: true
  }
 */
export const AnalyticsHooksService = new InjectionToken<AnalyticsHook[]>('AnalyticsHooksService');


export function provideAnalytics(trackRouteChanges: boolean, tracker: AnalyticsTracker): EnvironmentProviders {

  const providers: (EnvironmentProviders | Provider)[] = [{
    provide: AnalyticsService,
    useFactory: (
      actions: AnalyticsActions,
      adaptor: AnalyticsAdaptor,
      hooks: AnalyticsHook[]): AnalyticsService => {

      const hookGroup: CommandGroup<AnalyticsHook> = new CommandGroup<AnalyticsHook>(),
        processor: CommandProcessor = new CommandProcessor();

      if (Array.isArray(hooks)) {

        hooks = ([] as AnalyticsHook[]).concat(...hooks);

        //hookGroup.addCommands(hooks);
      }

      return new AnalyticsService(actions, adaptor, hookGroup, processor);
    },
    deps: [
      AnalyticsActionsService,
      AnalyticsAdaptorService,
      [new Optional(), AnalyticsHooksService]
    ]
  }];

  if(trackRouteChanges) {
    providers.push(ANALYTICS_ROUTER_PROVIDER);
  }

  if(tracker !== undefined) {
    const trkr = getAnalyticsTrackerProvider(tracker);

    if(trkr) {
      providers.push(trkr);
    }
  }

  return makeEnvironmentProviders(providers);
}
