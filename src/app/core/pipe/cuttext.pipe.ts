import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttext',
  standalone: true
})
export class CuttextPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
