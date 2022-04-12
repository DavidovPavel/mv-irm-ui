import { Validators } from '@angular/forms';
import { FormFieldModel, IRMPermissions } from '@irm-ui/common';

import { getOptionsFromDictionary } from '../../core/func';
import { BlameServiceCenterType } from '../../models/blame-service-center.enum';
import { Incident } from '../../models/incident';
import { IncidentRequestStatusTypeName } from '../../models/request-status.enum';

export const RequestFields: FormFieldModel<Incident>[] = [
  {
    name: 'incidentNumber',
    label: 'Номер инцидента/претензии',
    type: 'text',
    validators: [Validators.required],
    permission: IRMPermissions.IncidentEdit_incidentNumber,
  },
  {
    name: 'numberZNU',
    label: 'Номер ЗНУ',
    type: 'link',
  },
  {
    name: 'incidentRequestStatusType',
    label: 'Статус запроса',
    type: 'select',
    options: [{ Id: null, Name: '...' }, ...getOptionsFromDictionary(IncidentRequestStatusTypeName)],
    disabled: true,
  },
  {
    name: 'clientName',
    label: 'ФИО клиента',
    type: 'text',
    validators: [Validators.required],
    permission: IRMPermissions.IncidentEdit_clientName,
  },
  {
    name: 'clientPhone',
    label: 'Телефон клиента',
    type: 'text',
    validators: [Validators.required],
    permission: IRMPermissions.IncidentEdit_clientPhone,
  },
  {
    name: 'serviceCompanyName',
    label: 'Сервисная компания',
    type: 'text',
    disabled: true,
  },
  {
    name: 'serviceCenterName',
    label: 'Сервисный центр',
    type: 'text',
    disabled: true,
  },
  {
    name: 'blameServiceCenterType',
    label: 'Вина СЦ',
    type: 'select',
    options: [...getOptionsFromDictionary(BlameServiceCenterType)],
    permission: IRMPermissions.IncidentEdit_blameServiceCenterType,
  },
  {
    name: 'incidentCreationReasonId',
    label: 'Причина создания',
    type: 'select',
    // options: [{ Id: null, Name: '...' }, ...getOptionsFromDictionary(IncidentCreationReasonType)],
    validators: [Validators.required],
    permission: IRMPermissions.IncidentEdit_incidentCreationReasonType,
    output: (incident: Incident) => incident.incidentCreationReason.id
  },
  {
    name: 'responsibleEmployeeMail',
    label: 'Почта отв. сотрудника',
    type: 'text',
    validators: [Validators.required],
    permission: IRMPermissions.IncidentEdit_responsibleEmployeeMail,
    cssClassNames: 'full-width',
  },
  {
    name: 'problemEssence',
    label: 'Суть проблемы/обращения',
    type: 'textarea',
    permission: IRMPermissions.IncidentEdit_problemEssence,
    cssClassNames: 'full-width',
  },
  {
    name: 'expectedSolution',
    label: 'Ожидаемое решение',
    type: 'textarea',
    permission: IRMPermissions.IncidentEdit_expectedSolution,
    cssClassNames: 'full-width',
  }
];
