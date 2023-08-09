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
    return this.http.get<QuestionsResponse>(apiUrl).pipe(
      map(data => {
        return data.results.map(question => {
          // Sanitize question text
          question.question = this.sanitizeHtml(question.question);
  
          const shuffledAnswers = [question.correct_answer, ...question.incorrect_answers];
          for (let i = shuffledAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledAnswers[i], shuffledAnswers[j]] = [shuffledAnswers[j], shuffledAnswers[i]];
          }
  
          // Sanitize answer options
          question.shuffled_answers = shuffledAnswers.map(answer => this.sanitizeHtml(answer));
  
          return question;
        });
      })
    );
  }
  
  private sanitizeHtml(input: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'text/html');
    return doc.documentElement.textContent || '';
  }
}
