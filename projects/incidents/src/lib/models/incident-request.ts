import { IncidentCreationReasonType } from './creation-reason';

export interface IncidentRequest {
  numberZNU: string;
  incidentNumber: string;
  clientName: string;
  clientPhone: string;
  problemEssence: string;
  responsibleEmployeeMail: string;
  incidentCreationReasonType: IncidentCreationReasonType;
  shopId: number;
  serviceCenterId: number;
  expectedSolution: number;
  comments: string[];
}

export interface IncidentRequestCreateModel {
  requestFiles: File[];
  request: IncidentRequest;
}
