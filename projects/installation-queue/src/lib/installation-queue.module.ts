import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { IrmCommonModule } from '@irm-ui/common';

import { InstallationQueueComponent } from './installation-queue/installation-queue.component';
import {
  QuotaGroupInfoWidgetComponent,
} from './installation-queue/quota-group-info-widget/quota-group-info-widget.component';
import { QuotasInfoComponent } from './installation-queue/quotas-info/quotas-info.component';
import { QuotasComponent } from './installation-queue/quotas/quotas.component';
import { RegionInfoComponent } from './installation-queue/region-info/region-info.component';
import { RegionComponent } from './installation-queue/region/region.component';
import { ServiceCenterItemComponent } from './installation-queue/service-center-item/service-center-item.component';
import { ServiceCenterItemsComponent } from './installation-queue/service-center-items/service-center-items.component';
import { ServiceCentersComponent } from './installation-queue/service-centers/service-centers.component';
import { InstallationQueueStoreModule } from './store/installation-queue-store.module';
import { InstallationQueueWidgetComponent } from './widget/widget.component';

export const Material = [
  MatCardModule,
  MatListModule,
  MatDividerModule,
  ScrollingModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatCardModule,
  MatMomentDateModule,
  MatDatepickerModule,
  MatSelectModule,
  MatProgressSpinnerModule,
];
@NgModule({
  declarations: [
    InstallationQueueComponent,
    InstallationQueueWidgetComponent,
    QuotasComponent,
    QuotasInfoComponent,
    QuotaGroupInfoWidgetComponent,
    ServiceCentersComponent,
    ServiceCenterItemsComponent,
    ServiceCenterItemComponent,
    RegionComponent,
    RegionInfoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    IrmCommonModule,
    InstallationQueueStoreModule,
    [...Material],
  ],
  exports: [
    InstallationQueueComponent,
    InstallationQueueWidgetComponent,
    QuotasComponent,
    QuotasInfoComponent,
    InstallationQueueStoreModule,
    QuotaGroupInfoWidgetComponent,
  ],
})
export class InstallationQueueModule {}
