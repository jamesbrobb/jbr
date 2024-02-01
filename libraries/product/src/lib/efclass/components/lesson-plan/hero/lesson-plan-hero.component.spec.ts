import {CommonModule} from '@angular/common';
import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {DebugElement} from '@angular/core';

import {By} from '@angular/platform-browser';
import { LessonPlanHeroComponent } from './lesson-plan-hero.component';

import {LessonPlanSummaryDto} from "../../../../product";
import {lessonPlanSummaryDTOMock} from "../../../../product/lesson-plan/index.mock";
import {ImageComponent} from "../../../media/image/image/image.component";
import {FallbackImageComponent} from "../../../media/image/fallback/fallback-image.component";
import {ResponsiveContainerDirectiveMock} from "../../../responsive/container/responsive-container.directive.mock";



describe('LessonPlanHeroComponent', () => {

    let component: LessonPlanHeroComponent,
        fixture: ComponentFixture<LessonPlanHeroComponent>,
        mock: LessonPlanSummaryDto,
        titleElement: HTMLElement,
        tagElements: DebugElement[];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule
            ],
            declarations: [
                FallbackImageComponent,
                ImageComponent,
                LessonPlanHeroComponent,
                ResponsiveContainerDirectiveMock
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {

        mock = <any>lessonPlanSummaryDTOMock;

        fixture = TestBed.createComponent(LessonPlanHeroComponent);

        component = fixture.componentInstance;
        component.dataProvider = mock;
        component.ngOnChanges({});

        fixture.detectChanges();

        titleElement = fixture.debugElement.query(By.css('.title')).nativeElement;
        tagElements = fixture.debugElement.queryAll(By.css('.tag'));
    });

    it('should render the component', () => {
        expect(component).toBeDefined();
    });

    it('should display skills', () => {

        expect(
            mock.skills.map((skill: string) => skill.trim())
                .every((skill: string) => {
                        return tagElements.some((skillElement: DebugElement) => {
                            return skillElement.nativeElement.textContent.trim() === skill;
                        });
                    }
                )).toEqual(true);
    });

    it('should display title', () => {
        expect(titleElement.textContent).toEqual(mock.title);
    });
});
