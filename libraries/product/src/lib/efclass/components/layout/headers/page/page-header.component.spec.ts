import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {By} from '@angular/platform-browser';

import {PageHeaderComponent} from './page-header.component';


import {ResponsiveContainerDirectiveMock} from "@jamesbenrobb/ui/mocks";
import {ColorOverlayComponent} from "@jamesbenrobb/ui";
import {FallbackImageComponent} from "../../../media/image/fallback/fallback-image.component";
import {ImageComponent} from "../../../media/image/image/image.component";



describe('PageHeaderComponent', () => {

    let component: PageHeaderComponent,
        fixture: ComponentFixture<PageHeaderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule
            ],
            declarations: [
                PageHeaderComponent,
                FallbackImageComponent,
                ImageComponent,
                ColorOverlayComponent,
                ResponsiveContainerDirectiveMock
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(PageHeaderComponent);

        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should render the component', () => {
        expect(component).toBeDefined();
    });

    it('should display the supplied title', () => {

        const titleText = 'Title';

        component.title = titleText;

        fixture.detectChanges();

        const titleElement = fixture.debugElement.query(By.css('.title')).nativeElement;

        expect(titleElement.textContent).toEqual(titleText);
    });
});
