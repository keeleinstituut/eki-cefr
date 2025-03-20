import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideRouter, withEnabledBlockingInitialNavigation, RouterLink } from '@angular/router';
import { AboutProjectComponent } from './about-project.component';

describe('AboutProjectComponent', () => {
  let component: AboutProjectComponent;
  let fixture: ComponentFixture<AboutProjectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterLink],
      declarations: [AboutProjectComponent],
      providers: [
        provideRouter(
          [{ path: '', component: AboutProjectComponent }]
          , withEnabledBlockingInitialNavigation()
        )]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
