import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter, withEnabledBlockingInitialNavigation, RouterLink } from '@angular/router';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import { VocabularyListComponent } from './vocabulary-list.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('VocabularyListComponent', () => {
  let component: VocabularyListComponent;
  let fixture: ComponentFixture<VocabularyListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VocabularyListComponent, FeedbackModalComponent],
      imports: [ReactiveFormsModule, RouterLink],
      providers: [
        provideRouter(
          [{ path: '', component: VocabularyListComponent }]
          , withEnabledBlockingInitialNavigation()
        ), provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocabularyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
