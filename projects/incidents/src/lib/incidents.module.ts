import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { IRM_DATETIME_FORMAT, IrmCommonModule } from '@irm-ui/common';
import { NgxPermissionsModule } from 'ngx-permissions';

import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { RequestFilesComponent } from './components/request-files/request-files.component';
import { UploadFileDirective } from './directives/upload-file.directive';
import { CommentFileIconPipe } from './incident-card/comments/comment-file-icon.pipe';
import { CommentListComponent } from './incident-card/comments/comment-list/comment-list.component';
import { CommentsComponent } from './incident-card/comments/comments.component';
import { FileListComponent } from './incident-card/comments/file-list/file-list.component';
import { ControlsComponent } from './incident-card/controls/controls.component';
import { DialogCommentComponent } from './incident-card/controls/dialog-comment.component';
import { DepartureDateComponent } from './incident-card/departure-date/departure-date.component';
import { IncidentCardComponent } from './incident-card/incident-card.component';
import { RequestDataComponent } from './incident-card/request-data/request-data.component';
import { TimingComponent } from './incident-card/timing/timing.component';
import { ZnuDataComponent } from './incident-card/znu-data/znu-data.component';
import { IncidentRequestComponent } from './incident-request/incident-request.component';
import { IncidentExtendedFilterComponent } from './incident-search/extended-filter/extended-filter.component';
import { FilterComponent } from './incident-search/filter/filter.component';
import { IncidentSearchComponent } from './incident-search/incident-search.component';
import { ResultGridComponent } from './incident-search/result-grid/result-grid.component';
import { IncidentWidgetComponent } from './incident-widget/incident-widget.component';
import { InfinityScrollSelectComponent } from './infinity-scroll-select/infinity-scroll-select.component';
import { InfinityScrollDirective } from './infinity-scroll-select/infinity-scroll.directive';
import { PermissionManagementService } from './permission-management.service';
import { IncidentsStoreModule } from './store/incidents-store.module';

const Material = [
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatTooltipModule,
  MatBadgeModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatDialogModule,
  MatTabsModule,
];
@NgModule({
  declarations: [
    IncidentWidgetComponent,
    IncidentCardComponent,
    IncidentSearchComponent,
    IncidentExtendedFilterComponent,
    InfinityScrollDirective,
    InfinityScrollSelectComponent,
    RequestDataComponent,
    TimingComponent,
    ZnuDataComponent,
    ControlsComponent,
    FilterComponent,
    ResultGridComponent,
    CommentsComponent,
    CommentListComponent,
    FileListComponent,
    DepartureDateComponent,
    IncidentRequestComponent,
    UploadFileDirective,
    FileUploadComponent,
    DialogCommentComponent,
    CommentFileIconPipe,
    RequestFilesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    IrmCommonModule,
    IncidentsStoreModule,
    NgxPermissionsModule.forChild({ permissionsIsolate: true, rolesIsolate: true }),
    ...Material,
  ],
  exports: [
    IncidentWidgetComponent,
    IncidentCardComponent,
    IncidentsStoreModule,
    IncidentSearchComponent,
    IncidentRequestComponent,
  ],
  providers: [
    PermissionManagementService,
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    { provide: MAT_DATE_FORMATS, useValue: IRM_DATETIME_FORMAT },
  ],
  entryComponents: [DialogCommentComponent],
})
export class IrmIncidentsModule {}
