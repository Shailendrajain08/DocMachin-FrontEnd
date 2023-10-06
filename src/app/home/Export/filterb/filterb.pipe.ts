import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterb'
})
export class FilterbPipe implements PipeTransform {

  transform(value, arg1?:Date, arg2?:any,) {
    if(!arg1 || !arg2){

    return value;

    }else{
      let startDate = new Date(arg1);
      let endDate = new Date(arg2);
      let a = value.filter(
        m => new Date(m.date) >= startDate && new Date(m.date) <= endDate
      )
      return a;
    }

  }

}
