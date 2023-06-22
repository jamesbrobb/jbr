import {APP_INITIALIZER} from "@angular/core";
import {GAConfigService, AnalyticsActionsService} from "@jbr/ng";
import {AnalyticsActions, GaAnalyticsConfig} from "@jbr/core";
import {CONTROLS_PROVIDER, ControlsOptionsMapService} from "./controls/controls-config.provider";
import {GithubConfig, githubConfigService} from "./github/github-config";
import {AppConfig} from "./app-config";
import {PAGES_CONFIG_KEY, PagesConfig, PagesConfigMap} from "./page/page-config";
import {ControlsConfigParser} from "./controls/controls-config.parser";
import {menuConfigFactory, MenuConfigService} from "./menu/menu-config";
import {RouteConfig, ROUTES_CONFIG_KEY, RoutesConfig} from "../route";


enum TEMP_OVERLAY_COLORS {
  BLUE= 'blue',
  DARK_BLUE= 'dark-blue',
  GREEN= 'green',
  RED= 'red',
  PURPLE= 'purple',
  PINK= 'pink',
  GREY= 'grey'
}

enum TEMP_FALLBACK_COLORS {
  BLUE= 'blue',
  GREEN= 'green',
  ORANGE= 'orange',
  PURPLE= 'purple',
  WHITE= 'white'
}



export const APP_CONFIG_PROVIDERS = [{
    provide: ControlsOptionsMapService,
    useValue: {
      OVERLAY_COLORS: Object.values(TEMP_OVERLAY_COLORS).map(key => ({value: key})),
      FALLBACK_COLORS: [{label: 'none'}, ...Object.values(TEMP_FALLBACK_COLORS).map(key => ({value: key}))],
      IMAGE_URLS: [
        {label: 'none'},
        {value: '/assets/media-examples/sample.png', label: 'Image 1'},
        {value: '/assets/media-examples/sample_2.png', label: 'Image 2'}
      ]
    }
  }, {
    provide: githubConfigService,
    useFactory: (appConfig: AppConfig) => {
      return appConfig.getValueByKey<GithubConfig>('github-config');
    },
    deps: [AppConfig]
  }, {
    provide: GAConfigService,
    useFactory: (appConfig: AppConfig) => {
      return appConfig.getValueByKey<GaAnalyticsConfig>('ga-analytics');
    },
    deps: [AppConfig]
  }, {
    provide: AnalyticsActionsService,
    useFactory: (appConfig: AppConfig) => {
      return appConfig.getValueByKey<AnalyticsActions>('analytics');
    },
    deps: [AppConfig]
  }, {
    provide: PagesConfig,
    useFactory: (appConfig: AppConfig, parser: ControlsConfigParser) => {
      let config = appConfig.getValueByKey<PagesConfigMap>(PAGES_CONFIG_KEY);
      return new PagesConfig(config, parser);
    },
    deps: [AppConfig, ControlsConfigParser]
  }, {
    provide: MenuConfigService,
    useFactory: (appConfig: AppConfig) => {
      let config = appConfig.getValueByKey<RouteConfig>(ROUTES_CONFIG_KEY);
      return menuConfigFactory(config);
    },
    deps: [AppConfig]
  }, {
    provide: RoutesConfig,
    useFactory: (appConfig: AppConfig) => {
      let config = appConfig.getValueByKey<RouteConfig>(ROUTES_CONFIG_KEY);
      return new RoutesConfig(config);
    },
    deps: [AppConfig]
  }, {
    provide: APP_INITIALIZER,
    useFactory: (appConfig: AppConfig) => {
      return () => appConfig.load();
    },
    deps: [AppConfig],
    multi: true
  },
  CONTROLS_PROVIDER,
  AppConfig
]
