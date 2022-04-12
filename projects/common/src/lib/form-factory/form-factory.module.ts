import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FormControlsModule } from './../form-controls/form-controls.module';
import { ExistPipe } from './exist.pipe';
import { FormFactoryComponent } from './form-factory.component';
import { ListItemDirective } from './list-item.directive';

/**
 * @deprecated
 */
@NgModule({
  declarations: [FormFactoryComponent, ExistPipe, ListItemDirective],
  imports: [CommonModule, FormControlsModule, FlexLayoutModule],
  exports: [FormFactoryComponent, ListItemDirective],
})
export class FormFactoryModule {}
