import { Environment  } from './environment.model';

export const environment = {
  production: true
};

export const ENV: Environment = {
  mode: 'Production',
  WS_AUTH: 'https://login.',
  WS_PRODUTO:  'https://produto.',
  WS_CRM: 'https://crm.',
  WS_VENDAS: 'https://vendas.',
  WS_PUBLIC: 'https://publico.',
  WS_COMMONS: 'https://comum.',
  WS_TMS: 'https://tms.'

}