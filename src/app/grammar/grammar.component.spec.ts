import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ReactiveFormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';

import { GrammarComponent } from './grammar.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GrammarComponent', () => {
  let component: GrammarComponent;
  let fixture: ComponentFixture<GrammarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [GrammarComponent],
    imports: [ReactiveFormsModule, RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
