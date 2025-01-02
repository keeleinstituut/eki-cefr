import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { GrammarDetailComponent } from './grammar-detail.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('GrammarDetailComponent', () => {
  let component: GrammarDetailComponent;
  let fixture: ComponentFixture<GrammarDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [GrammarDetailComponent],
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrammarDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
