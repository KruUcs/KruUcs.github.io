import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface CategoryResponse {
  trivia_categories: Category[];
}

export interface QuestionsResponse {
  response_code: number;
  results: Question[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  shuffled_answers: string[];
  selected_answer: string;
}

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryResponse> {
    const apiUrl="https://opentdb.com/api_category.php"
    return this.http.get<CategoryResponse>(apiUrl)
  }

  getTriviaQuestions(category: string, difficulty: string): Observable<Question[]> {
    const apiUrl = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`;
    return this.http.get<QuestionsResponse>(apiUrl).pipe(map(data => {
      for (let question of data.results) {
        question.shuffled_answers = [question.correct_answer, ...question.incorrect_answers]
        for (let i = question.shuffled_answers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [question.shuffled_answers[i], question.shuffled_answers[j]] = [question.shuffled_answers[j], question.shuffled_answers[i]];
        }
      }
      return data.results;
    }));
  }
}
