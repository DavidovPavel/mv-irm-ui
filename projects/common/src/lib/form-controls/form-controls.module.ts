import { LabelControlComponent } from './label-control/label.component';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { CheckboxControlComponent } from './checkbox-control/checkbox-control.component';
import { DatepickerControlComponent } from './datepicker-control/datepicker-control.component';
import { ErrorInfoComponent } from './error-info/error-info.component';
import { FormControlDirective } from './form-control.directive';
import { LinkComponent } from './link/link.component';
import { SelectControlComponent } from './select-control/select-control.component';
import { TextControlComponent } from './text-control/text-control.component';
import { TextareaControlComponent } from './textarea-control/textarea-control.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTooltipModule,
    MatListModule,
    MatAutocompleteModule,
    PortalModule,
  ],
  declarations: [
    TextControlComponent,
    DatepickerControlComponent,
    TextareaControlComponent,
    SelectControlComponent,
    CheckboxControlComponent,
    ErrorInfoComponent,
    AutocompleteComponent,
    LinkComponent,
    FormControlDirective,
    LabelControlComponent
  ],
  exports: [
    TextControlComponent,
    DatepickerControlComponent,
    TextareaControlComponent,
    SelectControlComponent,
    CheckboxControlComponent,
    ErrorInfoComponent,
    AutocompleteComponent,
    LinkComponent,
    FormControlDirective,
    LabelControlComponent
  ],
})
export class FormControlsModule {}
