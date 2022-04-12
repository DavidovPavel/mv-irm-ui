import { ValidatorFn } from '@angular/forms';

import { cssType } from './css-type';
import { controlsType } from './form-controls-type';

export interface FormFieldModel<T = unknown> {
  value?: string | unknown[] | number | boolean | null;
  label: string;
  name: string;
  type: controlsType;
  disabled?: boolean;
  validators?: ValidatorFn[];
  cssClassNames?: cssType;
  hidden?: boolean;
  readonly?: true;
  hint?: string;
  permission?: string;
  options?: {id: number; name: string}[];
  /** @deprecated */
  output?(this: FormFieldModel<T>, source: T, ...args: any): string | string[] | number | boolean | null;
}
