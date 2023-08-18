import {bootstrapApplication} from "@angular/platform-browser";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {provideRouter} from "@angular/router";
import {provideAnalytics, AnalyticsTracker} from "@jbr/ng";
import {getComponentLoaderProviders} from "@jbr/ui";

import {AppComponent} from "./app/app.component";
import {APP_ROUTES} from "./app/route";
import {getAppConfigProviders} from "./app/config/app-config.providers";
import {getExampleProvider} from "./app/components/examples/example.providers";
import {getControlsLoaderProvider} from "./app/components/controls/controls-loader.directive";
import {getMarkdownProviders} from "./app/components/markdown/markdown.providers";


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      getMarkdownProviders()
    ),
    provideRouter(APP_ROUTES),
    getAppConfigProviders(),
    provideAnalytics(true, AnalyticsTracker.GOOGLE),
    getExampleProvider(),
    getComponentLoaderProviders(),
    getControlsLoaderProvider()
  ]
}).then(ref =>  {
  if (window['ngRef' as keyof Window]) {
    window['ngRef'as keyof Window].destroy();
  }
  // @ts-ignore
  window['ngRef'] = ref;
})
.catch(err => console.error(err));


