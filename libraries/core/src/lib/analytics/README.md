<!-- THIS IS A GENERATED FILE - DO NOT EDIT -->

# Analytics

A configurable analytics management implementation, that's both framework and tracking library agnostic.

---

To use analytics do the following:


1) [Define the analytics config](#1)
2) [Instantiate an AnalyticsService](#2)
3) [Create and send a tracking event](#3)

---

# 1.

**Define the analytics config**

```json
{
  "page": {
    "trackType": "page",
    "properties": {
      "page_title": "{%title%}",
      "page_path": "{%path%}",
      "page_location": "{%href%}"
    }
  },
  "some": {
    "other": {
      "tracking": {
        "metric": {
          "value_1": "{%value_1%}",
          "value_2": "{%value_2%}",
          "value_3": "{%value_3%}"
        }
      }
    }
  }
}
```

# 2.

**Instantiate an AnalyticsService**

Instantiate a third party analytics adaptor that implements the `AnalyticsAdaptor` interface

then

Instantiate the `AnalyticsService` passing in the config and the adaptor

```ts
import {CommandGroup} from "./command-group";
import {AnalyticsHook} from "./analytics-hook";
import {AnalyticsAdaptor} from "./analytics-adaptor";

import config from './analytics-config.json'


const hookGroup: CommandGroup<AnalyticsHook> = new CommandGroup<AnalyticsHook>(),
    processor: CommandProcessor = new CommandProcessor(),
    adaptor: AnalyticsAdaptor = new SomeThirdPartyAdaptor();

hookGroup.addCommand(new SomeThirdPartyAnalyticsHook());

const service = new AnalyticsService(config, adaptor, hookGroup, processor);
```
# 3.

**Create and send a tracking event, supplying a property value map with the required values**

```ts

const event: AnalyticsEvent = {
    actionId: 'some.other.tracking.metric',
    propertyValueMap:  {
        value_1: 'this',
        value_2: 'that',
        value_3: 10
    }
}

service.track(event);
```
