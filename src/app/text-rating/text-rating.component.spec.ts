import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextRatingComponent } from './text-rating.component';

describe('TextRatingComponent', () => {
  let component: TextRatingComponent;
  let fixture: ComponentFixture<TextRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextRatingComponent ]
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
