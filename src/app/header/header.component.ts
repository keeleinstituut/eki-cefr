import {Component, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public menuItem: string;
  public  APIEndpoint = environment; // .APIEndpoint;

  constructor() {
  }

  ngOnInit() {
  }

  setItem(selected: string) {
    this.menuItem = selected;
  }

}
