import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'baseCommon'
})
export class BasePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
