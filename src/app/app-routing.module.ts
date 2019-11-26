import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {VocabularyComponent} from './vocabulary/vocabulary.component';
import {WordVocabularyComponent} from './word-vocabulary/word-vocabulary.component';

const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'vocabulary', component: WordVocabularyComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
