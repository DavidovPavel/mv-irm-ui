import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

import { ComponentsModule } from './components/components.module';
import { FormControlsModule } from './form-controls/form-controls.module';
import { FormFactoryModule } from './form-factory/form-factory.module';
import { IRM_DATETIME_FORMAT } from './irm-datetime-format';
import { IrmGridModule } from './irm-grid/irm-grid.module';
import { IRMRequestFilterModule } from './irm-request-filter/request-filter.module';

@NgModule({
  imports: [FormControlsModule, FormFactoryModule, ComponentsModule, HttpClientModule, IrmGridModule, IRMRequestFilterModule],
  exports: [FormControlsModule, FormFactoryModule, ComponentsModule, IrmGridModule, IRMRequestFilterModule],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: MAT_DATE_FORMATS, useValue: IRM_DATETIME_FORMAT },
  ],
})
export class IrmCommonModule {}
