import { Subscription } from 'rxjs';
import { Directive, EventEmitter, Host, OnInit, Output, Renderer2, OnDestroy } from '@angular/core';
import { MatSelect } from '@angular/material/select';

const POINT_WHEN_EMMIT = 10;

@Directive({
  selector: '[irmInfinityScroll]',
})
export class InfinityScrollDirective implements OnInit, OnDestroy {
  subscription!: Subscription;

  @Output() nextPage = new EventEmitter();

  constructor(private renderer: Renderer2, @Host() private el: MatSelect) {}

  ngOnInit(): void {
    if ('openedChange' in this.el) {
      this.subscription = this.el.openedChange.subscribe((open: boolean) => this.registerPanel(open));
    } else {
      this.renderer.listen(this.el, 'scroll', this.onScrollPanel.bind(this));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  registerPanel(open: boolean): void {
    if (open) {
      const panel = (this.el as MatSelect).panel.nativeElement;
      this.renderer.listen(panel, 'scroll', this.onScrollPanel.bind(this));
    }
  }

  onScrollPanel(event: any): void {
    const target = event.target;

    const height =
      Array.from<HTMLElement>(target.children).reduce((p, c) => p + c.clientHeight, 0) - target.clientHeight;
    if (target.scrollTop > height - POINT_WHEN_EMMIT) {
      this.nextPage.emit();
    }
  }
}
