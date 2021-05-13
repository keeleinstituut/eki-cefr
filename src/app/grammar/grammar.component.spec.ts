import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ReactiveFormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';

import { GrammarComponent } from './grammar.component';

describe('GrammarComponent', () => {
  let component: GrammarComponent;
  let fixture: ComponentFixture<GrammarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule ],
      declarations: [ GrammarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrammarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
