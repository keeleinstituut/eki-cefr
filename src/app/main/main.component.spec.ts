import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideRouter, withEnabledBlockingInitialNavigation, RouterLink } from '@angular/router';
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterLink],
      declarations: [MainComponent],
      providers: [
        provideRouter(
          [{ path: '', component: MainComponent }],
          withEnabledBlockingInitialNavigation()
        )]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
