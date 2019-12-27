import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ekilex-tools';
  isIE = /msie\s/i.test(window.navigator.userAgent);

}
