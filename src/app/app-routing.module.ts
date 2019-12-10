import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {TextRatingComponent} from './text-rating/text-rating.component';
import {VocabularyListComponent} from './vocabulary-list/vocabulary-list.component';
import {GrammarComponent} from './grammar/grammar.component';
import {AboutProjectComponent} from './about-project/about-project.component';
import {GrammarDetailComponent} from './grammar-detail/grammar-detail.component';

const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'vocabulary', component: VocabularyListComponent },
  { path: 'rating', component: TextRatingComponent },
  { path: 'grammar', component: GrammarComponent },
  { path: 'about', component: AboutProjectComponent },
  { path: 'grammar-detail', component: GrammarDetailComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
