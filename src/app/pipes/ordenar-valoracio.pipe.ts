import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenarValoracio'
})
export class OrdenarValoracioPipe implements PipeTransform {

  transform(array) {

    array.sort((a: any, b: any) => {
      if (a.num_valoracions == 0 && b.num_valoracions != 0) {
        return 1;
      } else if (b.num_valoracions == 0 && a.num_valoracions != 0) {
        return -1;
      } else if(a.num_valoracions == 0 && b.num_valoracions == 0) {
        return 0;
      }
      if (a.total_valoracions / a.num_valoracions < b.total_valoracions / b.num_valoracions) {
        return 1;
      } else if (a.total_valoracions / a.num_valoracions > b.total_valoracions / b.num_valoracions) {
        return -1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
