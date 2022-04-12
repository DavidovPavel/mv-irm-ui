import { Component, Input, OnDestroy } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IRMPermissions } from '@irm-ui/common';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { dateToString } from '../../core/func';
import { IncidentRequestStatusTrigger } from '../../models/incident-request-status-trigger.enum';
import { IncidentsStoreActions, IncidentsStoreSelectors } from '../../store';
import { State } from '../../store/state';
import { Incident } from './../../models/incident';
import { DialogCommentComponent } from './dialog-comment.component';

@Component({
  selector: 'irm-incident-controls',
  templateUrl: './controls.component.html',
  styles: ['button {margin: 0 8px}'],
})
export class ControlsComponent implements OnDestroy {
  permissions = IRMPermissions;

  @Input() incident!: Incident;
  @Input() form!: FormGroup;
  @Input() filesToDelete = [];

  isLoad$ = this.store.select(IncidentsStoreSelectors.selectIsLoad);

  subscription!: Subscription;

  constructor(private store: Store<State>, public dialog: MatDialog) {}

  save(): void {
    const commentFilesCtr = this.form.get('commentFiles') as FormArray;
    const requestFilesCtr = this.form.get('requestFiles') as FormArray;
    const commentCtr = this.form.get('comment');

    const requestFiles: File[] = requestFilesCtr.value;
    const commentFiles: File[] = commentFilesCtr.value;
    const departureDate = dateToString(this.form.get('departureDate')?.value);
    const comments = commentCtr?.value ? [commentCtr.value] : null;

    const data = {
      id: this.incident.id,
      filesToDelete: this.filesToDelete,
      commentFiles,
      requestFiles,
      departureDate,
      comments,
      ...this.form.value,
    };
    this.store.dispatch(IncidentsStoreActions.updateIncident({ data }));

    this.filesToDelete = [];
    commentCtr?.setValue('');
    commentFilesCtr.clear();
    requestFilesCtr.clear();
  }

  sendTrigger(IncidentRequestUserEvent: IncidentRequestStatusTrigger): void {
    this.subscription = this.dialog
      .open(DialogCommentComponent, { width: '60%', data: { comment: this.form.get('comment')?.value } })
      .beforeClosed()
      .pipe(filter((c) => c))
      .subscribe((comment) => {
        const data = {
          id: this.incident.id,
          IncidentRequestUserEvent,
          comments: [comment],
        };
        this.store.dispatch(IncidentsStoreActions.updateRequestStatus({ data }));
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
