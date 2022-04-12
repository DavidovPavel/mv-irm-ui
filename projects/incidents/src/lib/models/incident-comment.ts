import { IRMUserRole } from '@irm-ui/common';
export interface IncidentComment {
  id: number;
  createDate: string;
  userLogin: string;
  userFullName: string;
  text: string;
  roles: IRMUserRole[];
}
