import {bootstrapApplication} from "@angular/platform-browser";
import {importProvidersFrom} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {provideRouter} from "@angular/router";
import {AppComponent} from "./app/app.component";
import {APP_ROUTES} from "./app/route";
import {APP_CONFIG_PROVIDERS} from "./app/config/app-config.providers";


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule
    ),
    provideRouter(
      APP_ROUTES
    ),
    ...APP_CONFIG_PROVIDERS
  ]
}).then(ref =>  {
  if (window['ngRef' as keyof Window]) {
    window['ngRef'as keyof Window].destroy();
  }
  // @ts-ignore
  window['ngRef'] = ref;
})
.catch(err => console.error(err));


