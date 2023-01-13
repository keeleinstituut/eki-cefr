import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { VocabularyListComponent} from './vocabulary-list/vocabulary-list.component';
import {NgbdSortableHeader} from './services/sortable.directive';
import { TextRatingComponent } from './text-rating/text-rating.component';
import {GrammarComponent, KeysPipe} from './grammar/grammar.component';
import {UsecaseComponent} from './usecase/usecase.component';
import { AboutProjectComponent } from './about-project/about-project.component';
import { FeedbackModalComponent } from './feedback-modal/feedback-modal.component';
import { GrammarDetailComponent } from './grammar-detail/grammar-detail.component';
import { SpinnerComponent } from './spinner/spinner.component';
import {AutosizeModule} from 'ngx-autosize';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { EducationalMaterialComponent } from './educational-material/educational-material.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    NgbdSortableHeader,
    VocabularyListComponent,
    TextRatingComponent,
    GrammarComponent,
    UsecaseComponent,
    AboutProjectComponent,
    KeysPipe,
    FeedbackModalComponent,
    GrammarDetailComponent,
    SpinnerComponent,
    EducationalMaterialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AutosizeModule
  ],
  providers: [FeedbackModalComponent, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
