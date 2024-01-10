import {EnvironmentProviders, makeEnvironmentProviders} from "@angular/core";
import {ComponentLoaderMapService} from "@jamesbenrobb/ui";
import {
  ColorOverlayComponentModule
} from "../../../../../../libraries/ui/src/lib/common/overlay/color/color-overlay.component";

export function getExampleProvider(): EnvironmentProviders {

  return makeEnvironmentProviders([{
    provide: ComponentLoaderMapService,
    useValue: {
      'color-overlay': {
        import: () => import('../../../../../../libraries/ui/src/lib/common/overlay/color/color-overlay.component'),
        standalone: false
      },
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
      //'fallback-image-dynamic': () => import('@jamesbenrobb/product/components/media/image/fallback/fallback-image-dynamic.module'),
      //'image-dynamic': () => import('@jamesbenrobb/product/components/media/image/image/image-dynamic.module')
    },
    multi: true
  }]);
}
