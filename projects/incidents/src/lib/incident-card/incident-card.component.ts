import { Component, HostBinding, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormFactoryService, Profile, ProfileStoreActions, ProfileStoreSelectors } from '@irm-ui/common';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, pluck, switchMap, tap } from 'rxjs/operators';

import { IncidentsStoreActions, IncidentsStoreSelectors } from '../store';
import { State } from '../store/state';
import { Incident } from './../models/incident';
import { PermissionManagementService } from './../permission-management.service';

@Component({
  selector: 'irm-incident-card',
  templateUrl: './incident-card.component.html',
  styles: ['.page-content {padding-top: 10px}'],
})
export class IncidentCardComponent implements OnInit {
  @HostBinding('class') class = 'page-container';

  form = new FormGroup({
    comment: new FormControl(''),
    commentFiles: new FormArray([]),
    requestFiles: new FormArray([]),
    departureDate: new FormControl(''),
  });

  incident$!: Observable<Incident>;
  permissions$ = this.store
    .select(IncidentsStoreSelectors.selectPermissions)
    .pipe(tap((permissions) => this.permissionService.add(permissions)));

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private permissionService: PermissionManagementService,
    private fieldService: FormFactoryService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(ProfileStoreActions.load());
    this.incident$ = this.init();
  }

  init(): Observable<Incident> {
    const profile$ = this.store
      .select<Profile>(ProfileStoreSelectors.select)
      .pipe(filter((a): a is Profile => a !== null));

    const incident$ = this.store
      .select(IncidentsStoreSelectors.selectIncidentRequest)
      .pipe(filter((a): a is Incident => a !== null));

    return this.route.params.pipe(
      pluck('id'),
      tap((id) => this.store.dispatch(IncidentsStoreActions.getIncidentRequest({ id }))),
      switchMap((_) => combineLatest([incident$, profile$])),
      map((a) => {
        const [incident, profile] = a;
        this.store.dispatch(IncidentsStoreActions.getPermissions({ id: incident.id }));
        this.fieldService.profile = profile;
        return incident;
      })
    );
  }

  back(): void {
    this.store.dispatch(IncidentsStoreActions.clearIncident());
    window.history.back();
  }
}
