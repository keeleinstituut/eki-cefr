import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideRouter, withEnabledBlockingInitialNavigation, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterLink, RouterOutlet],
      declarations: [
        AppComponent, FooterComponent, HeaderComponent
      ],
      providers: [
        provideRouter(
          [{ path: '', component: AppComponent }]
          , withEnabledBlockingInitialNavigation()
        )]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'teacher-tools'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('teacher-tools');
  });

});
