import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'baseCommon'
})
export class BaseCommonPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
