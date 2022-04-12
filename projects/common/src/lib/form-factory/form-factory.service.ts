import { Injectable } from '@angular/core';

import { FormFieldModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FormFactoryService {
  parse<T>(fields: FormFieldModel<T>[], source: T): FormFieldModel<T>[] {
    return fields.map((a) => ({
      ...a,
      value: source[a.name]
    }));
  }
}
