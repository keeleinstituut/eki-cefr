import {Component, ViewChild} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormArray, FormBuilder} from '@angular/forms';
import {FeedbackModalService} from './feedback-modal.service';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class FeedbackModalComponent {

  @ViewChild('content', {static: false}) content;
  public form;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private formBuilder: FormBuilder,
              private service: FeedbackModalService) {
    config.backdrop = 'static';
    config.keyboard = false;

    this.form = this.formBuilder.group({
      comments: '',
      sender: '',
      email: '',
      feedbackType: 'comment',
      lastSearch: '<õpetaja tööriistad>',
      word: '<õpetaja tööriistad>',
    });
  }

  open() {
    this.modalService.open(this.content);
  }
  close() {
    this.modalService.dismissAll();
  }

  sendData() {
    this.service.sendFeedback(this.form.value).subscribe();
  }
}
