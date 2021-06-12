export interface IAuth {
  authorization: string;
  empresa: IEmpresa;
  foto: string;
  id: number;
  iniciais: string;
  login: string;
  matricula: number;
  nome: string;
  nomeDisplay: string;
  senha: string;
  status: string;
}

interface IEmpresa {
  atualizarCadastroCliente: number;
  cnpj: string;
  fantasia: string;
  id: number;
  socket_monitoramento: string;
  usaFreteTMS: boolean;
}
