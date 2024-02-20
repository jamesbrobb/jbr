## @jamesbenrobb/* libraries

- [core](https://github.com/jamesbrobb/jbr/tree/main/libraries/core)
- [ng](https://github.com/jamesbrobb/jbr/tree/main/libraries/ng)
- [styles](https://github.com/jamesbrobb/jbr/tree/main/libraries/styles)
- [ts](https://github.com/jamesbrobb/jbr/tree/main/libraries/ts)
- [types](https://github.com/jamesbrobb/jbr/tree/main/libraries/types)
- [ui](https://github.com/jamesbrobb/jbr/tree/main/libraries/ui)

Published npm [packages](https://www.npmjs.com/settings/jamesbenrobb/packages)

1) [Add provider](#1)
2) [Add scripts and styles](#2)

# 1.

Add provider - also requires `HttpClientModule` unless you specify an alternative loader.

```ts
import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MarkdownModule} from "ngx-markdown";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      MarkdownModule.forRoot({
        loader: HttpClient
      })
    )
  ]
};
```

# 2.

Add scripts and styles to project definition on `angular.json`

```json
"scripts": [
  "node_modules/prismjs/prism.js"
]
```
Add any plugins you require

```json
"scripts": [
  "node_modules/prismjs/prism.js",
  "node_modules/prismjs/plugins/toolbar/prism-toolbar.js"
]
```

Add syntax highlighting for the languages you require, for example.

```json
"scripts": [
  "node_modules/prismjs/prism.js",
  "node_modules/prismjs/plugins/toolbar/prism-toolbar.js",
  "node_modules/prismjs/components/prism-css.min.js",
  "node_modules/prismjs/components/prism-css-extras.min.js",
  "node_modules/prismjs/components/prism-javascript.min.js",
  "node_modules/prismjs/components/prism-markup.min.js",
  "node_modules/prismjs/components/prism-typescript.min.js",
  "node_modules/prismjs/components/prism-sass.min.js",
  "node_modules/prismjs/components/prism-scss.min.js",
  "node_modules/prismjs/components/prism-json.min.js"
]
```

Add styles if required

```json
"styles": [
  "src/styles.scss",
  "node_modules/prismjs/themes/prism.css"
]
```



