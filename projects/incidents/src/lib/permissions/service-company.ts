import { IncidentRequestStatusType } from '../models/request-status.enum';

const noClosed = ['incident_edit_departureDate', 'incident_edit_comments', 'incident_edit_commentFiles'];

export const ServiceCompanyPermissions = new Map<IncidentRequestStatusType, string[]>([
  [IncidentRequestStatusType.Created, [...noClosed, 'incident_complete']],
  [IncidentRequestStatusType.InWork, [...noClosed, 'incident_complete']],
  [IncidentRequestStatusType.DepartureAppointed, [...noClosed, 'incident_complete']],
  [IncidentRequestStatusType.Closed, []],
]);
