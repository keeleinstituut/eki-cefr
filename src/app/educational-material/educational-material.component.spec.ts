import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withEnabledBlockingInitialNavigation, RouterLink } from '@angular/router';
import { EducationalMaterialComponent } from './educational-material.component';

describe('EducationalMaterialComponent', () => {
  let component: EducationalMaterialComponent;
  let fixture: ComponentFixture<EducationalMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterLink],
      declarations: [EducationalMaterialComponent],
      providers: [
        provideRouter(
          [{ path: '', component: EducationalMaterialComponent }]
          , withEnabledBlockingInitialNavigation()
        )]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EducationalMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
