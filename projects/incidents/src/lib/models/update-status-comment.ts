import { IncidentRequestStatusTrigger } from './incident-request-status-trigger.enum';

export interface UpdateStatusOrComment {
  id: number;
  IncidentRequestUserEvent?: IncidentRequestStatusTrigger;
  comments?: string[];
}
