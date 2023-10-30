import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenarPorExterno'
})
export class OrdenarPorExternoPipe implements PipeTransform {

  transform(items: any[]): any[] {
    if (!items || items.length <= 1) {
      return items;
    }

    const segundos = items.filter(item => item.externa && !item.id_ruta);
    const primeros = items.filter(item => !item.externa && !item.id_ruta);
    const terceros = items.filter(item => item.id_ruta);

    return [...primeros, ...segundos, ...terceros];
  }

}
