import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter, withEnabledBlockingInitialNavigation, RouterLink } from '@angular/router';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import { TextRatingComponent } from './text-rating.component';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
describe('TextRatingComponent', () => {
  let component: TextRatingComponent;
  let fixture: ComponentFixture<TextRatingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TextRatingComponent, FeedbackModalComponent],
      imports: [ReactiveFormsModule, NgbPopoverModule, RouterLink],
      providers: [
        provideRouter(
          [{ path: '', component: TextRatingComponent }]
          , withEnabledBlockingInitialNavigation()
        ),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
