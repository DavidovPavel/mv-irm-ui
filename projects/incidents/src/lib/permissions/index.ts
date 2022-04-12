import { IRMUserRole } from '@irm-ui/common';
import { IncidentRequestStatusType } from '../models/request-status.enum';

import { AdminPermissions } from './admin';
import { CallCenterPermissions } from './call-center';
import { CallCenterQuotaReservePermissions } from './call-center-quota-reserve';
import { CentralOfficePermissions } from './central-office';
import { InvestigationGroupPermissions } from './investigation-group';
import { SeniorManagerPermissions } from './senior-mamager';
import { ServiceCompanyPermissions } from './service-company';
import { StorePermissions } from './store';
import { SupportPermissions } from './support';

/** @deprecated comes from the back-end */
export const source = new Map<IRMUserRole, Map<IncidentRequestStatusType, string[]>>([
  [IRMUserRole.Administrator, AdminPermissions],
  [IRMUserRole.CallCenter, CallCenterPermissions],
  [IRMUserRole.ServiceCompany, ServiceCompanyPermissions],
  [IRMUserRole.Store, StorePermissions],
  [IRMUserRole.CentralOffice, CentralOfficePermissions],
  [IRMUserRole.SeniorManager, SeniorManagerPermissions],
  [IRMUserRole.Support, SupportPermissions],
  [IRMUserRole.CallCenterWithQuotaReserve, CallCenterQuotaReservePermissions],
  [IRMUserRole.InvestigationGroup, InvestigationGroupPermissions],
]);
