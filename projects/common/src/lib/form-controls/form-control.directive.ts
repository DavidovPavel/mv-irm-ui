import { ChangeDetectorRef, Directive, HostBinding, Input, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[irmFormControl]',
})
export class FormControlDirective implements OnInit {
  @HostBinding('class') css = 'full-width';

  @Input() form!: FormGroup;
  @Input() name!: string;
  @Input() hint: string;
  @Input() readonly: boolean;
  @Input() label!: string;
  @Input() value: string | number | boolean | unknown | unknown[] | null | undefined;
  @Input() validators: ValidatorFn | ValidatorFn[] | AbstractControlOptions;

  get control(): AbstractControl {
    if (this.form && this.name) {
      if (!this.form.controls[this.name]) {
        this.form.addControl(
          this.name,
          new FormControl({ value: this.value, disabled: this.readonly }, this.validators)
        );
      }
      return this.form.controls[this.name];
    }
    return null;
  }

  constructor(public cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.control?.markAllAsTouched();
    if (this.value) {
      this.control?.setValue(this.value);
    }
  }

  get isValid(): boolean {
    const c = this.control;
    if (c.disabled || this.readonly) {
      return true;
    }
    return c ? c.valid && (c.dirty || c.touched) : true;
  }

  hasError(name: string): boolean {
    return this.control.hasError(name);
  }
}
