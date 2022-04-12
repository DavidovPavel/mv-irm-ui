import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { ExtractPipe } from './extract.pipe';
import { GetRussianPaginatorIntl } from './i18n/paginator';
import { IrmGridComponent } from './irm-grid.component';
import { NgTemplateNameDirective } from './ng-template-name.directive';
import { TemplatePipe } from './template.pipe';
import { RowClassByPropertyDirective } from './options/row-class-by-property.directive';

@NgModule({
  declarations: [IrmGridComponent, ExtractPipe, NgTemplateNameDirective, TemplatePipe, RowClassByPropertyDirective],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
  ],
  exports: [IrmGridComponent, NgTemplateNameDirective, RowClassByPropertyDirective],
  providers: [{ provide: MatPaginatorIntl, useFactory: GetRussianPaginatorIntl }],
})
export class IrmGridModule {}
