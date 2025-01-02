import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ReactiveFormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';

import { VocabularyListComponent } from './vocabulary-list.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('VocabularyListComponent', () => {
  let component: VocabularyListComponent;
  let fixture: ComponentFixture<VocabularyListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [VocabularyListComponent],
    imports: [ReactiveFormsModule, RouterTestingModule],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
