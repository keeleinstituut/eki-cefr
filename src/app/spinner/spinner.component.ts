import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css'],
    standalone: false
})
export class SpinnerComponent implements OnInit {
  public message = 'Laetakse tulemusi';
  constructor() { }

  ngOnInit() {
  }

}
