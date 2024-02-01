import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {DebugElement} from '@angular/core';

import {LessonPlanGridComponent} from './lesson-plan-grid.component';
import {LessonPlanCardComponent} from '../card/lesson-plan-card.component';
import {LessonPlanHeroComponent} from '../hero/lesson-plan-hero.component';

import {LessonPlanSummaryDs} from "../../../../product";
import {lessonPlanSummaryDTOCollectionMock} from "../../../../product/lesson-plan/summary/index.mock";
import {GridLayoutComponent} from "../../../grid-layout/grid-layout.component";
import {ImageComponent} from "../../../media/image/image/image.component";
import {FallbackImageComponent} from "../../../media/image/fallback/fallback-image.component";
import {ResponsiveContainerDirectiveMock} from "../../../responsive/container/responsive-container.directive.mock";



describe('LessonPlanGridComponent', () => {

    let component: LessonPlanGridComponent,
        fixture: ComponentFixture<LessonPlanGridComponent>,
        mock: LessonPlanSummaryDs[];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule
            ],
            declarations: [
                LessonPlanHeroComponent,
                LessonPlanCardComponent,
                LessonPlanGridComponent,
                GridLayoutComponent,
                ImageComponent,
                FallbackImageComponent,
                ResponsiveContainerDirectiveMock
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {

        mock = lessonPlanSummaryDTOCollectionMock as LessonPlanSummaryDs[];

        fixture = TestBed.createComponent(LessonPlanGridComponent);

        component = fixture.componentInstance;
        component.dataProvider = mock;
        component.ngOnChanges();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the same amount of items as the supplied dataProvider length', () => {

        const cards: DebugElement[] = fixture.debugElement.queryAll(By.css('.grid-item'));

        expect(cards.length).toEqual(mock.length);
    });

    describe('header', () => {

        it('should display the supplied header value', () => {

            const headerValue = 'Header';

            component.ioHeader = headerValue;
            component.ngOnChanges();
            fixture.detectChanges();

            const headerElement = fixture.debugElement.query(By.css('.header')).nativeElement;

            expect(headerElement.textContent).toEqual(headerValue);
        });

        it('should not be displayed when a header value is not supplied', () => {

            const headerElement = fixture.debugElement.query(By.css('.header'));

            expect(headerElement).toBeNull();
        });
    });

    describe('title', () => {

        it('should display the supplied title', () => {

            const titleValue = 'Title';

            component.ioTitle = titleValue;
            component.ngOnChanges();
            fixture.detectChanges();

            const titleElement = fixture.debugElement.query(By.css('.lesson-plan-grid > .title')).nativeElement;

            expect(titleElement.textContent).toEqual(titleValue);
        });

        it('should not be displayed when a title value is not supplied', () => {

            const titleElement = fixture.debugElement.query(By.css('.lesson-plan-grid > .title'));

            expect(titleElement).toBeNull();
        });
    });

    describe('hero', () => {

        it('should not be displayed when showHero is false', () => {

            const heroElement = fixture.debugElement.query(By.css('.hero'));

            expect(component.showHero).toBeFalse();
            expect(heroElement).toBeNull();
        });

        it('should be displayed when showHero is true', () => {

            component.ioShowHero = true;
            component.ngOnChanges();
            fixture.detectChanges();

            const heroElement = fixture.debugElement.query(By.css('.hero'));

            expect(component.showHero).toBeTrue();
            expect(heroElement).not.toBeNull();
        });

        it('should display one less item than dataprovider length when hero is shown', () => {

            component.ioShowHero = true;
            component.ngOnChanges();
            fixture.detectChanges();

            const cards: DebugElement[] = fixture.debugElement.queryAll(By.css('.grid-item'));

            expect(component.showHero).toBeTrue();
            expect(cards.length).toEqual(mock.length - 1);
        });
    });
});
