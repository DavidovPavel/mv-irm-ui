import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { IncidentStoreEffects } from './effects';
import { reducer } from './reducer';
import { storeKey } from './state';

@NgModule({
  imports: [StoreModule.forFeature(storeKey, reducer), EffectsModule.forFeature([IncidentStoreEffects])],
})
export class IncidentsStoreModule {}
