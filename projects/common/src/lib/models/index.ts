export { FormFieldModel } from './form-field-model';
export { cssType } from './css-type';
export { IRMUserRole } from './user-roles';
export { ControlType } from './form-controls-type';

/**
 * @deprecated
 */
export interface Profile {
  id: number;
  login: string;
  name: string | null;
  email: string | null;
  cellPhone: string | null;
  serviceCompanyId: number | null;
  groupSid: string | null;
  isGroup: boolean;
  shopNumber: string | null;
  roles: number[] | null;
}
