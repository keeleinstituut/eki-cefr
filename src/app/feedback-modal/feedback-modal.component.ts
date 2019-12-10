import {Component, ViewChild} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class FeedbackModalComponent {

  @ViewChild('content', {static: false}) content;

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open() {
    this.modalService.open(this.content);
  }
}
