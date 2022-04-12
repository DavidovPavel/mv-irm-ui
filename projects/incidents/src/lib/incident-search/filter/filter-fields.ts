import { FormFieldModel } from '@irm-ui/common';
import { Incident } from '../../models/incident';

export const fields: { [key: string]: FormFieldModel<Incident>[] } = {
  createData: [
    {
      name: 'creationDateRange.from',
      hint: 'Дата создания от',
      label: 'От:',
      type: 'date',
      cssClassNames: 'half-width',
    },
    {
      name: 'creationDateRange.to',
      hint: 'Дата создания до',
      label: 'До:',
      type: 'date',
      cssClassNames: 'half-width',
    },
  ],
  closedData: [
    {
      name: 'closeDateRange.from',
      hint: 'Дата закрытия от',
      label: 'От:',
      type: 'date',
      cssClassNames: 'half-width',
    },
    {
      name: 'closeDateRange.to',
      hint: 'Дата закрытия до',
      label: 'До:',
      type: 'date',
      cssClassNames: 'half-width',
    },
  ],
  selectFilters: [
    {
      name: 'incidentRequestStatusType',
      label: 'Статус запроса',
      type: 'select'
    },
    {
      name: 'serviceCenterId',
      label: 'Сервисный центр',
      type: 'select'
    },
    {
      name: 'salesChannel', // нет такого поля on backe-end
      label: 'Канал продаж',
      type: 'select',
    },

    {
      name: 'serviceCompanyId',
      label: 'Контрагент ',
      type: 'select',
    },
    {
      name: 'cityId',
      label: 'Город',
      type: 'select',
    },
    {
      name: 'shopId',
      label: 'Магазин',
      type: 'select',
    },

    {
      name: 'brand',
      label: 'Бренд',
      type: 'select',
    },
    {
      name: 'blameServiceCenterType',
      label: 'Вина СЦ',
      type: 'select',
    },
  ],
};
