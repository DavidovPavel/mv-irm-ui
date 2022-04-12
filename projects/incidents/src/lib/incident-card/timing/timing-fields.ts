import { FormFieldModel, outputForDateTime } from '@irm-ui/common';

import { Incident } from '../../models/incident';

export const TimingFields: FormFieldModel<Incident>[] = [
  {
    name: 'creationDate',
    label: 'Дата создания',
    type: 'label',
    output: outputForDateTime('creationDate'),
    cssClassNames: 'half-width',
  },
  {
    name: 'reopenDate',
    label: 'Дата переоткрытия',
    type: 'label',
    output: outputForDateTime('reopenDate'),
    cssClassNames: 'half-width',
  },
  {
    name: 'actualReactionDate',
    label: 'Фактическая дата реагирования',
    type: 'label',
    output: outputForDateTime('actualReactionDate'),
    cssClassNames: 'half-width',
  },
  {
    name: 'closeDate',
    label: 'Дата закрытия',
    type: 'label',
    output: outputForDateTime('closeDate'),
    cssClassNames: 'half-width',
  }
];
