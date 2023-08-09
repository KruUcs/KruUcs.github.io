import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  transform(value: string): string | null {
    return new DOMParser().parseFromString(value, 'text/html').documentElement
      .textContent;
  }

}
