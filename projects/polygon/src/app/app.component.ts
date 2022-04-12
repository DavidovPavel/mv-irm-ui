import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [
    `
      :host {
        display: flex;
        height: 100%;
      }

      header {
        background-color: aliceblue;
        padding: 6px 10px;
      }
    `,
  ],
  template: `<div fxFlex="14%">
      <ul>
        <li><a routerLink="grid">grid</a></li>
      </ul>
    </div>
    <div fxFlex="86%" fxLayout="column">
      <header>header</header>
      <main fxFlex>
        <router-outlet></router-outlet>
      </main>
    </div>`,
})
export class AppComponent {}
