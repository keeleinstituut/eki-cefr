import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ekilex-tools';
  isIE = /msie\s|trident\//i.test(window.navigator.userAgent);

}
