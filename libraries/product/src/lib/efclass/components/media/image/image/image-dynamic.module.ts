import {NgModule} from "@angular/core";

import {BaseDynamicModule} from "@jamesbenrobb/ui";
import {ImageComponent, ImageComponentModule} from "./image.component";



@NgModule({
  imports: [
    ImageComponentModule
  ]
})
export class ImageDynamicComponentModule extends BaseDynamicModule {
  static override readonly COMPONENT = ImageComponent;
  static override readonly MODULE = ImageComponentModule;
}
