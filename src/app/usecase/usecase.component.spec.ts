import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, withEnabledBlockingInitialNavigation, RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import { UsecaseComponent } from './usecase.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('UsecaseComponent', () => {
  let component: UsecaseComponent;
  let fixture: ComponentFixture<UsecaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterLink],
      declarations: [UsecaseComponent, FeedbackModalComponent],
      providers: [provideRouter(
        [{ path: '', component: UsecaseComponent }]
        , withEnabledBlockingInitialNavigation()
      ),
      provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsecaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
