import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(displayProduct:any[] ,term:string): any[] {
    return displayProduct.filter((item)=>item.title.toLowerCase().includes(term.toLowerCase()))
  }

}
