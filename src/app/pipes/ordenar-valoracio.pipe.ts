import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenarValoracio'
})
export class OrdenarValoracioPipe implements PipeTransform {

  transform(array) {

    array.sort((a: any, b: any) => {
      if (a.total_valoracions / a.num_valoracions < b.total_valoracions / b.num) {
        return 1;
      } else if (a.total_valoracions / a.num_valoracions > b.total_valoracions / b.num) {
        return -1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
