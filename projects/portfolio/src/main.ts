import {bootstrapApplication} from "@angular/platform-browser";
import {importProvidersFrom} from "@angular/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {provideRouter} from "@angular/router";
import {provideAnalytics, AnalyticsTracker} from "@jbr/ng";
import {AppComponent} from "./app/app.component";
import {APP_ROUTES} from "./app/route";
import {getAppConfigProviders} from "./app/config/app-config.providers";
import {MarkdownModule} from "ngx-markdown";


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      MarkdownModule.forRoot({loader: HttpClient})
    ),
    provideRouter(APP_ROUTES),
    getAppConfigProviders(),
    provideAnalytics(true, AnalyticsTracker.GOOGLE)
  ]
}).then(ref =>  {
  if (window['ngRef' as keyof Window]) {
    window['ngRef'as keyof Window].destroy();
  }
  // @ts-ignore
  window['ngRef'] = ref;
})
.catch(err => console.error(err));


