import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMilis',
})
export class FormatMilisPipe implements PipeTransform {
  transform(millisec: number): string {
    const seconds = (millisec / 1000).toFixed(1);
    const minutes = (millisec / (1000 * 60)).toFixed(1);
    const hours = (millisec / (1000 * 60 * 60)).toFixed(1);
    const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);
    if (Number(seconds) < 60) {
      return seconds + ' Segundos';
    } else if (Number(minutes) < 60) {
      return minutes + ' Minutos';
    } else if (Number(hours) < 24) {
      return hours + ' Horas';
    } else {
      return days + ' Días';
    }
  }
}
