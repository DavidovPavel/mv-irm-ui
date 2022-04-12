import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { IRMPermissions } from '@irm-ui/common';
import { Store } from '@ngrx/store';

import { PermissionManagementService } from '../../permission-management.service';
import { IncidentsStoreActions } from '../../store';
import { State } from '../../store/state';
import { Incident } from './../../models/incident';

@Component({
  selector: 'irm-incident-comments',
  templateUrl: './comments.component.html',
})
export class CommentsComponent {
  @Input() incident!: Incident;
  @Input() form!: FormGroup;

  constructor(private store: Store<State>, private permissionService: PermissionManagementService) {}

  get disabledSendComment(): boolean {
    return !this.permissionService.has(IRMPermissions.IncidentEdit_comments);
  }

  get disableAttachFile(): boolean {
    return !this.permissionService.has(IRMPermissions.IncidentEdit_commentFiles);
  }

  get commentFiles(): FormArray {
    return this.form.get('commentFiles') as FormArray;
  }

  addComment(text: string): void {
    const data = {
      id: this.incident.id,
      comments: [text],
    };
    this.store.dispatch(IncidentsStoreActions.updateRequestStatus({ data }));
  }

  addFiles(items: File[]): void {
    const data = {
      id: this.incident.id,
      items,
    };
    this.store.dispatch(IncidentsStoreActions.addToServiceCenterFileStores({ data }));
  }

  removeFileStores(id: number): void {
    const data = { id: this.incident.id, filesToDelete: [id] };
    this.store.dispatch(IncidentsStoreActions.removeFromServiceCenterFileStores({ data }));
  }

  download(id: number): void {
    this.store.dispatch(IncidentsStoreActions.downloadFile({ id }));
  }
}
