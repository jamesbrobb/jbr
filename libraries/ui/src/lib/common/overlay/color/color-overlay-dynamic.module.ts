import {NgModule} from '@angular/core';
import {BaseDynamicModule} from "@jbr/ui";
import {
  ColorOverlayComponent,
  ColorOverlayComponentModule
} from "./color-overlay.component";




@NgModule({
  imports: [
    ColorOverlayComponentModule
  ]
})
export class ColorOverlayDynamicComponentModule extends BaseDynamicModule {

  static override readonly COMPONENT = ColorOverlayComponent;
  static override readonly MODULE = ColorOverlayComponentModule;
}
