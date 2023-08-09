import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizPageComponent } from './quiz-page/quiz-page.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ScoreBackgroundColorDirective } from './directives/score-background-color.directive';
import { SanitizeHtmlPipe } from './pipe/sanitize-html.pipe';

@NgModule({
  declarations: [
    AppComponent,
    QuizPageComponent,
    ResultPageComponent,
    ScoreBackgroundColorDirective,
    SanitizeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
