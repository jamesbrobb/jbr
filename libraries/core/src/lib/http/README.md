<!-- THIS IS A GENERATED FILE - DO NOT EDIT -->
# HTTP

A framework agnostic, configurable http solution.

---
1) [Create endpoints config](#1)
2) [Instantiate endpoint factory](#2)
3) [Using a factory to create an endpoint](#3)
4) [Using an endpoint to make a request](#4)
---

# 1.

**Create endpoints config**

```json
{
    "endpoints": {
        "user": {
            "baseUrl": "/user",
            "withCredentials": true,
            "requestHooks": [
                "SomeGeneralRequestHook"
            ],
            "responseHooks": [
                "SomeGeneralResponseHook"
            ],
            "errorHooks": [
                "SomeGeneralErrorHook"
            ],
            "methods": {
                "get": {
                    "type": "GET",
                    "url": "/:id",
                    "requestHooks": [
                        "SomeMethodSpecificRequestHook"
                    ],
                    "responseHooks": [
                        "SomeMethodSpecificResponseHook"
                    ],
                    "errorHooks": [
                        "SomeMethodSpecificErrorHook"
                    ]
                },
                "update": {
                    "type": "PUT",
                    "url": "/:id/preferences"
                },
                "create": {
                    "type": "POST"
                }
            }
        }
    }
}
```

# 2.

**Instantiate endpoint factory**

```ts
import {HttpEndpointHooks, HttpEndpointsConfig} from "./http-endpoint-factory";
import {HttpAdaptor} from "./http-adaptor"

const config: HttpEndpointsConfig = '{...}', // previously loaded config.json
    adaptor: HttpAdaptor = new SomeHttpAdaptor(),
    hooks: HttpEndpointHooks = {
        requestHooks: new Map<string, HttpRequestHook>(),
        responseHooks: new Map<string, HttpResponseHook>(),
        errorHooks: new Map<string, HttpErrorHook>()
    };


hooks.requestHooks.set('SomeGeneralRequestHook', new SomeGeneralRequestHook());
hooks.requestHooks.set('SomeMethodSpecificRequestHook', new SomeMethodSpecificRequestHook());

hooks.responseHooks.set('SomeGeneralResponseHook', new SomeGeneralResponseHook());
hooks.responseHooks.set('SomeMethodSpecificResponseHook', new SomeMethodSpecificResponseHook());

hooks.errorHooks.set('SomeGeneralErrorHook', new SomeGeneralErrorHook());
hooks.errorHooks.set('SomeMethodSpecificErrorHook', new SomeMethodSpecificErrorHook());

const factory = new HttpEndpointFactory({adaptor, config, hooks});

```

# 3.

**Using a factory**

```ts
/*
 deserialises the config and builds the endpoint
 */
import {HttpEndpoint} from "./http-endpoint";

const userEndpoint: HttpEndpoint = factory.createByType('user');
```

# 4.

**Using an endpoint to make a request**

```ts
import {HttpResponse} from "./http-response";
import {HttpError} from "./http-error";

userEndpoint.request('get', {id: 1})
    .pipe(
        take(1),
        map((response: HttpResponse) => {
            console.log(response.data);
        }),
        catchError((error: HttpError) => {
            console.log(error);
        })
    ).subscribe();
```
