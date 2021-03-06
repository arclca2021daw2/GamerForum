import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenarData'
})
export class OrdenarDataPipe implements PipeTransform {

  transform(array) {
    array.sort((a: any, b: any) => {
      if (a.data_afegit > b.data_afegit) {
        return -1;
      } else if (a.data_afegit < b.data_afegit) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}
