import {APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";


export function getGithubBtnProviders(iconPath: string): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: APP_INITIALIZER,
    useFactory: (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) => {
      iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl(iconPath));
      return () => Promise.resolve();
    },
    deps: [
      MatIconRegistry,
      DomSanitizer
    ],
    multi: true
  },
    MatIconRegistry
  ]);
}


