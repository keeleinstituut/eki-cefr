import {Component, ViewChild} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';
import {FeedbackModalService} from './feedback-modal.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class FeedbackModalComponent {

  @ViewChild('content', {static: false}) content;
  public form;

  public APIEndpoint = environment.production && environment.APIEndpoint ? environment.APIEndpoint : environment;
  public success = false;
  public error = false;
  public agree = false;

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
    this.success = false;
    this.error = false;
  }

  sendData() {
    this.error = false;
    this.success = false;
    if (this.form.controls.comments.invalid) {
      this.error = true;
    } else {
      this.service.sendFeedback(this.form.value).subscribe((data) => {
          if (data.status === 'error') {
            this.error = true;
          } else {
            if (this.agree === false) {
              this.error = true;
            } else {
              this.success = true;
              this.form.controls.comments.reset();
              this.form.controls.sender.reset();
              this.form.controls.email.reset();
            }
          }
        }
      );
    }
  }
}
