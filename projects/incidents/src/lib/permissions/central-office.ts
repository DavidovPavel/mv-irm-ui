import { IncidentRequestStatusType } from '../models/request-status.enum';
import { notClosed } from './not-closed-status';

export const CentralOfficePermissions = new Map<IncidentRequestStatusType, string[]>([
  [IncidentRequestStatusType.Created, [...notClosed, 'incident_edit_requestFiles', 'incident_cancel']],
  [IncidentRequestStatusType.InWork, [...notClosed, 'incident_edit_commentFiles', 'incident_cancel']],
  [IncidentRequestStatusType.DepartureAppointed, [...notClosed, 'incident_edit_commentFiles']],
  [
    IncidentRequestStatusType.Closed,
    [
      'incident_edit_blameServiceCenterType',
      'incident_edit_comments',
      'incident_edit_commentFiles',
      'incident_send_to_SC',
    ],
  ],
]);
