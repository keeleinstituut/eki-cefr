import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

declare let gtag: (conf, id, path) => void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'ekilex-tools';
  isIE = /msie\s|trident\//i.test(window.navigator.userAgent);

  constructor(public router: Router) {
    this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          gtag('config', 'UA-134441495-1',
            {
              page_path: event.urlAfterRedirects
            }
          );
        }

        if (!this.router.url.includes('/about#')) {
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
          });
        }
      }
    );
  }
}
