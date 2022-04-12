import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { IncidentsStoreActions, IncidentsStoreSelectors } from '../store';
import { State } from '../store/state';

@Component({
  selector: 'irm-incident-widget',
  templateUrl: './incident-widget.component.html',
  styleUrls: ['./incident-widget.component.scss'],
})
export class IncidentWidgetComponent {
  stats$ = this.store.select(IncidentsStoreSelectors.selectStatusData);
  constructor(private store: Store<State>) {
    this.store.dispatch(IncidentsStoreActions.getStatus());
  }
}
