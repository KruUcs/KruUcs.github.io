import { Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScoreBackgroundColor]'
})
export class ScoreBackgroundColorDirective {
  
  @Input('appScoreBackgroundColor') score: number = 0;
  
  @HostBinding('style.backgroundColor') get backgroundColor() {
    if (this.score <= 1) {
      return "red";
    } else if (this.score <= 3) {
      return "yellow"
    } else {
      return "green"
    }
  }

}
