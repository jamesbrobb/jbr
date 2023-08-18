import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {ComponentLoaderMapService} from "@jbr/ui";

export function getExampleProvider(): EnvironmentProviders {
  return makeEnvironmentProviders([{
    provide: ComponentLoaderMapService,
    useValue: {
      //'color-overlay-dynamic': () => import('@jbr/components/common/overlay/color/color-overlay-dynamic.module'),
      'grid-layout-example': {
        import:() => import('./grid-layout/grid-layout-example.component'),
        standalone: false
      },
      'responsive-container-example': {
        import: () => import('./responsive-container/responsive-container-example.component'),
        standalone: false
      },
      //'page-header-example': () => import('./page-header/page-header-example.component'),
      'flex-grid-example': () => import('./flex-grid/flex-grid-example.component'),
      //'fallback-image-dynamic': () => import('@jbr/product/components/media/image/fallback/fallback-image-dynamic.module'),
      //'image-dynamic': () => import('@jbr/product/components/media/image/image/image-dynamic.module')
    },
    multi: true
  }]);
}
