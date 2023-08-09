import { Component } from '@angular/core';
import { Category, Question, TriviaService } from '../trivia.service';
import { Observable, from, map } from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css']
})
export class QuizPageComponent {
  selectedCategory: string = "";
  selectedDifficulty: string = "";
  answeredAll: boolean = false;

  questions$: Observable<Question[]> = from([]);
  categories$: Observable<Category[]> = from([]);
  shuffledAnswers$: Array<string> = [];

  constructor(private triviaService: TriviaService, private router: Router) {}

  ngOnInit(): void {
      this.categories$ = this.triviaService
        .getCategories()
        .pipe(
          map(data => {
            return data.trivia_categories;
          }
        ));
  }

  onCreateQuiz() {
    if(this.selectedCategory && this.selectedDifficulty) {
      this.questions$ = this.triviaService.getTriviaQuestions(this.selectedCategory, this.selectedDifficulty);
    }
  }

  selectAnswer(answer: string, question: Question, questions: Question[]) {
    question.selected_answer = answer;
    this.answeredAll = questions.every(q => q.hasOwnProperty("selected_answer"));
  }

  onSubmitQuiz(questions: Question[]){
    this.router.navigate(["/result"], {state: {questions: questions}})
  }
}