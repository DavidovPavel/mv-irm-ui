import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { registerLocaleData, CommonModule } from '@angular/common';
import locale from '@angular/common/locales/ru';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '@env/environment';
import { ENVIRONMENT_TOKEN, IrmCommonModule } from '@irm-ui/common';
import { NgxPermissionsModule } from 'ngx-permissions';

import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';

registerLocaleData(locale, 'ru');

const routes: Routes = [{ path: 'grid', component: GridComponent }];

@NgModule({
  declarations: [AppComponent, GridComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FlexLayoutModule,
    IrmCommonModule,
    MatMomentDateModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    NgxPermissionsModule.forRoot(),
  ],
  providers: [
    // { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    // { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    // { provide: MAT_DATE_FORMATS, useValue: IRM_DATETIME_FORMAT },
    {
      provide: ENVIRONMENT_TOKEN,
      useValue: environment,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
