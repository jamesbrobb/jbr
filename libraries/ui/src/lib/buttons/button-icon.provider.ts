import {APP_INITIALIZER, EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";


const svg_icons = [
  'chevron_left',
  'chevron_right',
  'dark_mode',
  'expand_less',
  'expand_more',
  'light_mode',
  'menu',
  'menu_open'
]


export function registerButtonIcons(iconPath: string): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: APP_INITIALIZER,
    useFactory: (iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) => {

      iconPath = iconPath.endsWith('/') ? iconPath : `${iconPath}/`;

      svg_icons.forEach(icon => {
        iconRegistry.addSvgIcon(icon, sanitizer.bypassSecurityTrustResourceUrl(`${iconPath}${icon}.svg`));
      });
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
