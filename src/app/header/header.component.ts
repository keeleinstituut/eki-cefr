import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  public menuItem: string;
  public APIEndpoint = environment.production && environment.APIEndpoint ? environment.APIEndpoint : environment;
  @ViewChild(FeedbackModalComponent)
  public modal: FeedbackModalComponent;
  public collapsed = true;
  public center = '';

  ngAfterViewInit() {
  }

  public align() {
    if (this.collapsed) {
      return 'center';
    }
    return '';
  }
  setItem(selected: string) {
    this.menuItem = selected;
    this.collapsed = true;
    this.center = 'center';
  }
}
