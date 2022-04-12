import { FormControlsModule } from './../form-controls/form-controls.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { IrmCardContainerComponent } from './card-container/card-container.component';
import { IrmShortDisplayComponent } from './short-display/short-display.component';

@NgModule({
  declarations: [IrmCardContainerComponent, IrmShortDisplayComponent],
  imports: [CommonModule, RouterModule, MatIconModule, MatExpansionModule, FormControlsModule],
  exports: [IrmCardContainerComponent, IrmShortDisplayComponent],
})
export class ComponentsModule {}
