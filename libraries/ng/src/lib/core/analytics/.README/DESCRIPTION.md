
A module that exposes:

- a directive to track interaction
- url change tracking

It has 3 injection tokens, 2 required and one optional

- AnalyticsActionsService: `AnalyticsActions` - for config
- AnalyticsAdaptorService: `AnalyticsAdaptor` - to supply a tracking library specific adaptor
- AnalyticsHooksService: `AnalyticsHook[]` - Optional - enables a way to supply/configure pre-hooks which execute before the supplied tracking event is sent
