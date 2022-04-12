import { MatExpansionPanel } from '@angular/material/expansion';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'irm-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss'],
})
export class IrmCardContainerComponent {
  @Input() panelOpenState = true;

  @Input() noExpand = true;

  @Output() openState = new EventEmitter<boolean>();

  opened(): void {
    if (!this.noExpand) {
      this.panelOpenState = true;
    }
  }

  closed(ep: MatExpansionPanel): void {
    if (this.noExpand) {
      this.panelOpenState = !this.panelOpenState;
      ep.expanded = true;
      this.openState.emit(this.panelOpenState);
    } else {
      this.panelOpenState = false;
    }
  }
}
