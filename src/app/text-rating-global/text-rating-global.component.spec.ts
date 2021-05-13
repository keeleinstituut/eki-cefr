import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TextRatingGlobalComponent } from './text-rating-global.component';

describe('TextRatingGlobalComponent', () => {
  let component: TextRatingGlobalComponent;
  let fixture: ComponentFixture<TextRatingGlobalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, HttpClientTestingModule ],
      declarations: [ TextRatingGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextRatingGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
