import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import {TextRatingComponent} from './text-rating/text-rating.component';
import {VocabularyListComponent} from './vocabulary-list/vocabulary-list.component';

const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'vocabulary', component: VocabularyListComponent },
  { path: 'rating', component: TextRatingComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
