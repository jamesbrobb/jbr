import {Component, Input, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ResponsiveContainerDirectiveModule} from "@jamesbenrobb/ui";
import {FALLBACK_COLORS, ImageComponentModule} from "../../../media";
import {ColorOverlayComponentModule, OVERLAY_COLORS} from "../../../common";



@Component({
    selector: 'page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {

    @Input() title?: string;
    @Input() fallbackSeed?: string;
    @Input() fallbackColor?: FALLBACK_COLORS;
    @Input() overlayColor: OVERLAY_COLORS = OVERLAY_COLORS.BLUE;
    @Input() imageUrl?: string;
    @Input() imageSize?: string;
}


@NgModule({
  imports: [
    CommonModule,
    ImageComponentModule,
    ColorOverlayComponentModule,
    ResponsiveContainerDirectiveModule
  ],
  declarations: [PageHeaderComponent],
  exports: [PageHeaderComponent]
})
export class PageHeaderComponentModule {}
