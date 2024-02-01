import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {CommonModule} from "@angular/common";

import { LessonPlanHeaderComponent } from './lesson-plan-header.component';
import {IconRegistry} from '../../../common/icons';
import {IconRegistryMock} from '../../../common/icons/registry/icon-registry.mock';
import {SvgRegistry} from '../../../common/svg';
import {SvgRegistryMock} from '../../../common/svg/registry/svg-registry.mock';
import {AssetServiceConfiguration, LessonPlanDS} from "../../../../product";
import {lessonPlanDSMock} from "../../../../product/lesson-plan/index.mock";
import {PageHeaderComponent} from "../../../layout/headers/page/page-header.component";
import {ComponentsModule} from "../../../components.module";
import {ResponsiveContainerDirective} from "../../../responsive/container/responsive-container.directive";
import {AnalyticsModule} from "../../../../ng/core";
import {ResponsiveContainerDirectiveMock} from "../../../responsive/container/responsive-container.directive.mock";
import {AnalyticsModuleMock} from "../../../../ng/core/analytics/analytics.module.mock";
import {ObjectUtils} from "../../../../core";




describe('LessonPlanHeaderComponent', () => {

    let component: LessonPlanHeaderComponent,
        fixture: ComponentFixture<LessonPlanHeaderComponent>,
        dataProvider: LessonPlanDS;

    const assetConfig: AssetServiceConfiguration = {
        baseUrl: '',
        paths: {
          image:''
        }
    };

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule,
                ComponentsModule
            ],
            declarations: [
              PageHeaderComponent
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
        .overrideModule(ComponentsModule, {
          remove: {
            declarations: [ResponsiveContainerDirective],
            exports: [ResponsiveContainerDirective],
            imports: [AnalyticsModule]
          },
          add: {
            declarations: [ResponsiveContainerDirectiveMock],
            exports: [ResponsiveContainerDirectiveMock],
            imports: [AnalyticsModuleMock]
          }
        })
        .compileComponents();
    }));

    beforeEach(() => {

        dataProvider = ObjectUtils.clone(lessonPlanDSMock)

        fixture = TestBed.createComponent(LessonPlanHeaderComponent);

        component = fixture.componentInstance;
        component.dataProvider = dataProvider;
        component.ngOnChanges();

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

