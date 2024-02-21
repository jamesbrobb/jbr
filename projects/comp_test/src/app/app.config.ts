import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MarkdownModule} from "ngx-markdown";
import {registerButtonIcons} from "@jamesbenrobb/ui";


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      MarkdownModule.forRoot({
        loader: HttpClient
      })
    ),
    registerButtonIcons('assets/icons/')
  ]
};
