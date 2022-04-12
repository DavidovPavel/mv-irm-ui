import { FormFieldModel } from '@irm-ui/common';

import { Incident } from '../../models/incident';
import { SaleChannel } from '../../models/sale-channel.enum';

export const ZnuFields: FormFieldModel<Incident>[] = [
  {
    name: 'serviceName',
    label: 'Наименование услуги',
    type: 'label',
    cssClassNames: 'full-width'
  },
  {
    name: 'internetOrderNumber',
    label: 'Номер интернет заказа',
    type: 'label',
  },
  {
    name: 'tsOrderNumber',
    label: 'Номер заказа TS',
    type: 'label',
  },
  {
    name: 'saleChannel',
    label: 'Канал продаж',
    type: 'label',
    output: (i: Incident) => SaleChannel[i.saleChannel]
  },
  {
    name: 'shop.name',
    label: 'Магазин №',
    type: 'label',
    output: (s: Incident) => s.shop?.name
  },
  {
    name: 'city.name',
    label: 'Город',
    type: 'label',
    output: (s: Incident) => s.city?.name
  },
];
