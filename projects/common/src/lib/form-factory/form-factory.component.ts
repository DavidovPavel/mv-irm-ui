import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { FormFieldModel } from '../models/form-field-model';

@Component({
  selector: 'irm-form-factory',
  templateUrl: './form-factory.component.html',
  styleUrls: ['./form-factory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFactoryComponent implements OnInit, OnChanges {
  @Input() form!: FormGroup;

  @Input()
  fields: FormFieldModel[] = [];

  constructor(public cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.form) {
      this.fields.forEach((c) =>
        this.form.addControl(
          c.name,
          c.type === 'file'
            ? new FormArray([], c.validators)
            : new FormControl({ value: c.value, disabled: c.disabled }, c.validators)
        )
      );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const fields = changes.fields;
    if (fields) {
      this.fields = fields.currentValue;
      if (this.form) {
        this.fields
          .filter((a) => a.type !== 'file')
          .forEach((e) => {
            const ctr = this.form.controls[e.name];
            if (ctr) {
              ctr.setValue(e.value);
              if (e.disabled) {
                ctr.disable();
              } else {
                ctr.enable();
              }
            }
          });
      }
    }
  }
}
