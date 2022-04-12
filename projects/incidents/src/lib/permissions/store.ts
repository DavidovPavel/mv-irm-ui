import { IncidentRequestStatusType } from '../models/request-status.enum';
import { notClosed } from './not-closed-status';

export const StorePermissions = new Map<IncidentRequestStatusType, string[]>([
  [IncidentRequestStatusType.Created, [...notClosed, 'incident_edit_requestFiles', 'incident_cancel']],
  [IncidentRequestStatusType.InWork, [...notClosed, 'incident_cancel']],
  [IncidentRequestStatusType.DepartureAppointed, [...notClosed]],
  [IncidentRequestStatusType.Closed, ['incident_edit_comments', 'incident_edit_commentFiles', 'incident_send_to_SC']],
]);
