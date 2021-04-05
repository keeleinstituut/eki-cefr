import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FeedbackModalComponent} from '../feedback-modal/feedback-modal.component';
import {GrammarDetailService} from '../services/grammar-detail.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-grammar-detail',
  templateUrl: './grammar-detail.component.html',
  styleUrls: ['./grammar-detail.component.css']
})
export class GrammarDetailComponent implements OnInit {

  @ViewChild(FeedbackModalComponent)
  private modal: FeedbackModalComponent;
  public obj = {};
  isDataAvailable = false;
  public lang = '';

  constructor(
    public location: Location,
    private detailService: GrammarDetailService) {
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
