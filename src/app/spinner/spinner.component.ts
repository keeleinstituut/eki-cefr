import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SpinnerComponent implements OnInit {
  public message = 'Laetakse tulemusi';
  constructor() { }

  ngOnInit() {
  }

}
