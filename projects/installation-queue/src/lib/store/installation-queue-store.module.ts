import { NgModule } from '@angular/core';
import { IrmCommonModule } from '@irm-ui/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { InstallationQueueEffects } from './effects';
import { reducer } from './reducer';
import { storeKey } from './state';

@NgModule({
  imports: [
    IrmCommonModule,
    StoreModule.forFeature(storeKey, reducer),
    EffectsModule.forFeature([InstallationQueueEffects]),
  ],
})
export class InstallationQueueStoreModule {}
