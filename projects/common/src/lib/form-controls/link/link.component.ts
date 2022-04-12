import { Component, Input } from '@angular/core';

@Component({
  selector: 'irm-link-control',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent {
  targetBlank = false;
  url: string;
  title: string;

  @Input() label!: string;

  @Input() set value(value: string[]) {
    if (value && Array.isArray(value)) {
      const [url, title, targetBlank] = value as string[];
      this.url = url;
      this.title = title;
      this.targetBlank = targetBlank === '_blank';
    }
  }
}
