import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordVocabularyComponent } from './word-vocabulary.component';

describe('WordVocabularyComponent', () => {
  let component: WordVocabularyComponent;
  let fixture: ComponentFixture<WordVocabularyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordVocabularyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordVocabularyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
