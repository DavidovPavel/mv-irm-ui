import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormFactoryService, FormFieldModel } from '@irm-ui/common';

import { Incident } from './../../models/incident';
import { ZnuFields } from './znu-fields';

enum ShopType {
  'mvideo' = 2,
  'eldorado' = 3,
}
@Component({
  selector: 'irm-incident-znu-data',
  templateUrl: './znu-data.component.html',
})
export class ZnuDataComponent implements OnChanges {
  fields: FormFieldModel<Incident>[] = [];

  @Input() incident!: Incident;

  constructor(private fieldService: FormFactoryService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const ds = changes.incident;
    if (ds) {
      this.fields = this.fieldService.parse(ZnuFields, ds.currentValue);
    }
  }

  get iconSrc(): string {
    const brand = this.incident.shop.brand;
    return `/Main/assets/img/icon-${ShopType[brand]}.png`;
  }
}
