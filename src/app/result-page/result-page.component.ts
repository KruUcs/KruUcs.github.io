import { Component } from '@angular/core';
import { Question } from '../trivia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent {
  questions: Question[] = [];
  score: number = 0;

  constructor(private router: Router) {
    this.questions = router.getCurrentNavigation()?.extras?.state!['questions']
  }

  ngOnInit() {
    for(const question of this.questions) {
      if (question.selected_answer === question.correct_answer) {
        this.score++
      }
    }
  }

  createNew() {
    this.router.navigate(["/"])
  }
}