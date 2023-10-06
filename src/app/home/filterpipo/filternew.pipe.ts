import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filternew'
})
export class FilternewPipe implements PipeTransform {

  // transform(value: any, searchTerm: any): any {
  //   if(value.length === 0){
  //     return value
  //   }
  //   return value.filter(function(search){
  //     return search.commodity.indexOf(searchTerm) > -1
  //   });

  // }
  transform(myobjects: Array<object>, args?: Array<object>): any {
    if (args && Array.isArray(myobjects)) {
      // copy all objects of original array into new array of objects
      var returnobjects = myobjects;
      // args are the compare oprators provided in the *ngFor directive
      args.forEach(function (filterobj) {
        let filterkey = Object.keys(filterobj)[0];
        let filtervalue = filterobj[filterkey];

        myobjects.forEach(function (objectToFilter) {
          if (objectToFilter[filterkey] != filtervalue && filtervalue != "") {
            // object didn't match a filter value so remove it from array via filter
            returnobjects = returnobjects.filter(obj => obj !== objectToFilter);
          }
        })
      });
      // return new array of objects to *ngFor directive
      return returnobjects;
    }

}

}
