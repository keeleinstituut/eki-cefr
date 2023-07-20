import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TextRatingComponent } from './text-rating/text-rating.component';
import { VocabularyListComponent } from './vocabulary-list/vocabulary-list.component';
import { GrammarComponent } from './grammar/grammar.component';
import { UsecaseComponent } from './usecase/usecase.component';
import { AboutProjectComponent } from './about-project/about-project.component';
import { GrammarDetailComponent } from './grammar-detail/grammar-detail.component';
import { EducationalMaterialComponent } from './educational-material/educational-material.component';

const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'vocabulary', component: VocabularyListComponent },
  { path: 'rating', component: TextRatingComponent },
  { path: 'grammar', component: GrammarComponent },
  { path: 'usecase', component: UsecaseComponent },
  { path: 'about', component: AboutProjectComponent },
  { path: 'grammar-detail', component: GrammarDetailComponent },
  { path: 'educational-material', component: EducationalMaterialComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })
  ],

  exports: [RouterModule]
})
export class AppRoutingModule {
}
