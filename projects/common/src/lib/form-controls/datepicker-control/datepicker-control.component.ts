import { Component } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { IRM_DATETIME_FORMAT } from '../../irm-datetime-format';
import { FormControlDirective } from '../form-control.directive';

@Component({
  selector: 'irm-datepicker-control',
  templateUrl: './datepicker-control.component.html',
  styleUrls: ['./datepicker-control.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: IRM_DATETIME_FORMAT }],
})
export class DatepickerControlComponent extends FormControlDirective {
  dateChange(e: MatDatepickerInputEvent<Date>): void {
    this.control.setValue(e.value ? e.value.toISOString() : '');
  }
}
