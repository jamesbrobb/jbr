import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {IconsModule, SvgModule, iconConfig, svgConfig} from "@jamesbenrobb/product";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      IconsModule.forRoot(iconConfig),
      SvgModule.forRoot(svgConfig),
      BrowserAnimationsModule
    )
  ]
};
