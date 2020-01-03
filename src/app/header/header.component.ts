import {Component} from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public menuItem: string;
  public APIEndpoint = environment; //.APIEndpoint;

  setItem(selected: string) {
    this.menuItem = selected;
  }

}
