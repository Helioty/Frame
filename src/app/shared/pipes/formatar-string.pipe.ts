import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarString',
})
export class FormatarStringPipe implements PipeTransform {
  transform(value: any, ...args: any) {
    const filter = args[0];
    const mask: any = args[1];

    if (filter === 'VALOR-PADRAO') {
      // return this.currencycomma(value);
      return new Intl.NumberFormat('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    } else if (filter === 'VALOR') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);
    } else if (filter === 'PERCENT') {
      const val = value.toFixed(mask);
      return val + '%';
    } else if (filter === 'CPFCGC') {
      value = value.toString();
      value = this.formataCPFNPJ(value);
      return value;
    } else if (filter === 'CEP') {
      value = this.formataCEP(value);
      return value;
    } else if (filter === 'FONE') {
      value = this.formataFONE(value);
      return value;
    } else if (filter === 'CAPTILIZE') {
      value = this.captilizeString(value);
      return value;
    } else if (filter === 'SPLIT') {
      value = this.splited(value, mask);
      return value;
    } else if (filter === 'FORMAT') {
      value = this.strFormatPipe(value, mask);

      if (value > 1) {
        value = value + ' itens';
      } else {
        value = value + ' item';
      }
      return value;
    } else if (filter === 'LIMITED') {
      value = this.strlimited(value);
      return value;
    }
  }

  private splited(str: string, idx: any) {
    const fulltext = str.split('|');
    return fulltext[idx];
  }

  private strlimited(str: string) {
    const n = str.length;
    if (n > 20) {
      return str.substr(1, n - 30);
    }
    return str;
  }

  private captilizeString(text: string) {
    return !!text ? text.charAt(0).toUpperCase() + text.substr(1).toLowerCase() : '';
  }

  private strFormatPipe(value: string, args: any) {
    const tam = args.length - 1;
    const zero = '0'.repeat(tam);
    value = zero + value;
    return value;
  }

  private formataCEP(value: string): string {
    value = value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d{3})(\d)/, '$1.$2-$3');
    return value;
  }

  private formataFONE(value: string): string {
    if (value.length === 11) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length < 11 && value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})/, '($1) $2-');
    } else if (value.length <= 6 && value.length > 2) {
      value = value.replace(/^(\d{2})/, '($1) ');
    } else {
      value = value.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return value;
  }

  private formataCPFNPJ(value: string): string {
    value = value.replace(/\D/g, ''); // Remove tudo o que não é dígito

    if (value.length === 11) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      return value;
    } else if (value.length > 11) {
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
      return value;
    } else if (value.length < 11 && value.length > 9) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      return value;
    } else if (value.length > 6 && value.length <= 9) {
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      return value;
    } else if (value.length > 3 && value.length <= 6) {
      value = value.replace(/^(\d{3})(\d)/, '$1.$2');
      return value;
    } else {
      return value;
    }
  }
}
