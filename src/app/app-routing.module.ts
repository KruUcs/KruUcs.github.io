import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { ResultPageComponent } from './result-page/result-page.component';

const routes: Routes = [
  { path: '', component: QuizPageComponent },
  { path: 'result', component: ResultPageComponent },
  { path: '**', component: QuizPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
