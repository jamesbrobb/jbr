import {Component, Input, NgModule, OnChanges} from '@angular/core';
import {CommonModule} from "@angular/common";



export enum OVERLAY_COLORS {
    BLUE= 'blue',
    DARK_BLUE= 'dark-blue',
    GREEN= 'green',
    RED= 'red',
    PURPLE= 'purple',
    PINK= 'pink',
    GREY= 'grey'
}


@Component({
    selector: 'color-overlay',
    templateUrl: './color-overlay.component.html',
    styleUrls: ['./color-overlay.component.scss']
})
export class ColorOverlayComponent implements OnChanges {

    @Input() color?: OVERLAY_COLORS;
    @Input() allowTransition: boolean = true;

    public overlayColor: OVERLAY_COLORS = OVERLAY_COLORS.BLUE;

    public ngOnChanges(): void {
        this.overlayColor = this.color ?? OVERLAY_COLORS.BLUE;
    }
}


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ColorOverlayComponent],
  exports: [ColorOverlayComponent]
})
export class ColorOverlayComponentModule {}
