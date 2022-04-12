import { BlameServiceCenterType } from './blame-service-center.enum';
import { IncidentCreationReasonType } from './creation-reason';
import { IncidentComment } from './incident-comment';
import { IncidentFile } from './incident-file';
import { IncidentRequestStatusType } from './request-status.enum';
import { SaleChannel } from './sale-channel.enum';
import { City } from './service-center';
import { Shop } from './shop';

export interface Incident {
  id: number;
  numberZNU: string;
  incidentNumber: string;
  clientName: string;
  clientPhone: string;
  incidentCreationReason: IncidentCreationReasonType;
  problemEssence: string;
  expectedSolution: string;
  responsibleEmployeeMail: string;
  serviceCenterId: number;
  serviceCenterName: string;
  serviceCompanyId: number;
  serviceCompanyName: string;
  incidentRequestStatusType: IncidentRequestStatusType;
  blameServiceCenterType: BlameServiceCenterType;
  departureDate: string;
  creationDate: string;
  reopenDate: string;
  actualReactionDate: string;
  closeDate: string;
  shop: Shop;
  city: City;
  saleChannel: SaleChannel;
  requestFiles: IncidentFile[];
  commentFiles: IncidentFile[];
  comments: IncidentComment[];
}
