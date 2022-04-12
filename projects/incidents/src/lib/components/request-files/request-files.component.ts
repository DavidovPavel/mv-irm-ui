import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IncidentFile } from '../../models/incident-file';
import { UploadFileDirective } from './../../directives/upload-file.directive';

@Component({
  selector: 'irm-incident-request-files',
  templateUrl: './request-files.component.html',
  styleUrls: ['./request-files.component.scss'],
})
export class RequestFilesComponent extends UploadFileDirective {
  @Input() disabled = true;
  @Input() dataSource!: IncidentFile[];

  @Output() download = new EventEmitter();
  @Output() remove = new EventEmitter<number>();

  downloadItem(file: IncidentFile): void {
    if (file.id) {
      this.download.emit(file);
    }
  }

  removeItem(file: IncidentFile): void {
    this.dataSource = this.dataSource.filter((a) => a.file.name !== file.file.name || a.id !== file.id);
    if (file.id) {
      this.remove.emit(file.id);
    }
  }
}
