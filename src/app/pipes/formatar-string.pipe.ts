import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatarString'
})

export class FormatarStringPipe implements PipeTransform {
  transform(value: any, ...args) {
    const filter = args[0];
    const mask: any = args[1];

    if (filter === 'VALOR-PADRAO') {
      // return this.currencycomma(value);
      return new Intl.NumberFormat('pt-BR', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    } else if (filter === 'VALOR') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value);
    } else if (filter === 'PERCENT') {
      const val = value.toFixed(mask);
      return val + '%';
    } else if (filter === 'CPFCGC') {
      value = value.toString();

      if (value.length === 11) {
        value = value.replace(/\D/g, ''); // Remove tudo o que não é dígito
        value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
        value = value.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
        // de novo (para o segundo bloco de números)
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen entre o terceiro e o quarto dígitos
        return value;
      } else {
        value = value.replace(/\D/g, ''); // Remove tudo o que não é dígito
        value = value.replace(/^(\d{2})(\d)/, '$1.$2'); // Coloca ponto entre o segundo e o terceiro dígitos
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // Coloca ponto entre o quinto e o sexto dígitos
        value = value.replace(/\.(\d{3})(\d)/, '.$1/$2'); // Coloca uma barra entre o oitavo e o nono dígitos
        value = value.replace(/(\d{4})(\d)/, '$1-$2'); // Coloca um hífen depois do bloco de quatro dígitos
        return value;
      }
    } else if (filter === 'CEP') {
      value = value.replace(/\D/g, '');
      value = value.replace(/^(\d{2})(\d{3})(\d)/, '$1.$2-$3');
      return value;
    } else if (filter === 'FONE') {
      if (value.length === 11) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else {
        value = value.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      }
      return value;
    } else if (filter === 'CAPTILIZE') {
      value = this.captilizeString(value);
      return value;
    } else if (filter === 'SPLIT') {
      value = this.splited(value, mask);
      return value;
    } else if (filter === 'FORMAT') {
      value = this.StrFormatPipe(value, mask);

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

  private splited(str: string, idx) {
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

  private captilizeString(text) {
    return !!text
      ? text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
      : '';
  }

  private StrFormatPipe(value, args: any) {
    const tam = args.length - 1;
    const zero = '0'.repeat(tam);
    value = zero + value;
    return value;
  }
}
