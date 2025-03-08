import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

declare let gtag: (conf, id, path) => void;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})

export class AppComponent {
  title = 'teacher-tools';
  isIE = /msie\s|trident\//i.test(window.navigator.userAgent);

  constructor(public router: Router) {
    const urlParams = ['#', '?'];

    this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          gtag('config', 'UA-134441495-1',
            {
              page_path: event.urlAfterRedirects
            }
          );
        }

        if (!urlParams.some(char => this.router.url.includes(char))) {
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
