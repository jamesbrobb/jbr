import {CommonModule} from "@angular/common";
import {DebugElement} from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import { LessonPlanVocabularyComponent } from './lesson-plan-vocabulary.component';
import {SvgComponent, SvgRegistry} from '../../../common/svg';
import {SvgRegistryMock} from '../../../common/svg/registry/svg-registry.mock';
import {IconRegistryMock} from '../../../common/icons/registry/icon-registry.mock';
import {IconComponent, IconRegistry} from '../../../common/icons';
import {WordSenseDS, WordSenseParser} from "../../../../product";
import {wordSenseDTOCollectionMock} from "../../../../product/word-sense/index.mock";
import {GridLayoutComponent} from "../../../grid-layout/grid-layout.component";
import {MatIcon} from "@angular/material/icon";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";



describe('LessonPlanVocabularyComponent', () => {

    let component: LessonPlanVocabularyComponent,
        fixture: ComponentFixture<LessonPlanVocabularyComponent>,
        dataProvider: WordSenseDS[];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                NoopAnimationsModule
            ],
            declarations: [
                IconComponent,
                MatIcon,
                SvgComponent,
                GridLayoutComponent,
                LessonPlanVocabularyComponent
            ],
            providers: [
                {
                    provide: IconRegistry,
                    useClass: IconRegistryMock
                }, {
                    provide: SvgRegistry,
                    useClass: SvgRegistryMock
                }
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {

        dataProvider = WordSenseParser.fromDTOArrayToDSArray(<any>wordSenseDTOCollectionMock);

        fixture = TestBed.createComponent(LessonPlanVocabularyComponent);

        component = fixture.componentInstance;
        component.dataProvider = dataProvider;
        component.ngOnChanges();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the count', () => {

        const countElement: HTMLElement = fixture.debugElement.query(By.css('.count')).nativeElement;

        expect(countElement.textContent?.indexOf(dataProvider.length.toString())).toEqual(1);
    });

    it('should display the correct number of word senses', () => {

        const words: DebugElement[] = fixture.debugElement.queryAll(By.css('.word-sense'));

        expect(words.length).toEqual(dataProvider.length);
    });
});
