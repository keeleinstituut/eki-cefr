import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FeedbackModalComponent} from '../feedback-modal/feedback-modal.component';
import {GrammarDetailService} from '../services/grammar-detail.service';

@Component({
  selector: 'app-grammar-detail',
  templateUrl: './grammar-detail.component.html',
  styleUrls: ['./grammar-detail.component.css']
})
export class GrammarDetailComponent implements OnInit {

  @ViewChild(FeedbackModalComponent, {static: false})
  private modal: FeedbackModalComponent;
  public obj = {};
  isDataAvailable = false;
  public lang = '';

  constructor(private detailService: GrammarDetailService) {
  }

  ngOnInit() {
    this.fetchEvent();
  }

  fetchEvent() {
    return this.detailService.getData().subscribe((data: any) => {
      this.obj = data.item;
    }, () => {
    }, () => {
      this.isDataAvailable = true;
    });
  }


}
