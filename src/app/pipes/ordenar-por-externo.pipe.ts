import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenarPorExterno'
})
export class OrdenarPorExternoPipe implements PipeTransform {

  transform(items: any[]): any[] {
    if (!items || items.length <= 1) {
      return items;
    }

    const externaList = items.filter(item => item.externa);
    const noExternaList = items.filter(item => !item.externa);

    return [...noExternaList, ...externaList];
  }

}
