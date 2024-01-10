import {NgModule} from "@angular/core";

import {BaseDynamicModule} from "@jamesbenrobb/ui";
import {FallbackImageComponent, FallbackImageComponentModule} from "./fallback-image.component";



@NgModule({
  imports: [
    FallbackImageComponentModule
  ]
})
export class FallbackImageDynamicComponentModule extends BaseDynamicModule {
  static override readonly COMPONENT = FallbackImageComponent;
  static override readonly MODULE = FallbackImageComponentModule;
}
