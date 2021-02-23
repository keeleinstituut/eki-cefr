import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextRatingGlobalComponent } from './text-rating-global.component';

describe('TextRatingGlobalComponent', () => {
  let component: TextRatingGlobalComponent;
  let fixture: ComponentFixture<TextRatingGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
