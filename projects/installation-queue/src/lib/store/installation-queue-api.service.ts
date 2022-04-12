import { Injectable } from '@angular/core';
import { ApiService } from '@irm-ui/common';
import { Observable } from 'rxjs';
import { QuotaGroups, Regions, ReportSettings, ServiceCenters } from './models';

@Injectable({
  providedIn: 'root',
})
export class InstallationQueueApiService {
  private apiUrl = 'InstallationQueue/api';
  constructor(private api: ApiService) {}

  initQuotas(sapId: string): Observable<object> {
    return this.api.post(`${this.apiUrl}/ServiceCompanies/Queues`, { sapId });
  }

  hasQuotas(sapId: string): Observable<object> {
    return this.api.head(`${this.apiUrl}/ServiceCompanies/${sapId}/Quotas/Groups`);
  }

  getQuotaGroups(sapId: string): Observable<QuotaGroups> {
    return this.api.get(`${this.apiUrl}/ServiceCompanies/${sapId}/Quotas/Groups`);
  }

  getServiceCenters(sapId: string, quotaGroupId: number): Observable<ServiceCenters> {
    return this.api.get(`${this.apiUrl}/ServiceCompanies/${sapId}/Quotas/Groups/${quotaGroupId}/ServiceCenters`);
  }

  getRegions(sapId: string, quotaGroupId: number, serviceCenterId: number): Observable<Regions> {
    return this.api.get(
      `${this.apiUrl}/ServiceCompanies/${sapId}/Quotas/Groups/${quotaGroupId}/ServiceCenters/${serviceCenterId}/Regions`
    );
  }

  getSettings(): Observable<ReportSettings> {
    return this.api.get<ReportSettings>(`${this.apiUrl}/Quotas/Reports/Settings`);
  }
}
