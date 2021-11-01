import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL, ENV } from 'src/app/config/app.config.service';
import { BaseService } from '../http/base.service';
import { Produto } from './produto.interface';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private http: BaseService) {}

  /**
   * @author helio.souza
   * @description Retorna produto usando o codigo. Serviço JAVA.
   * @param codigo - Codigo do produto.
   * @return Objeto do Produto formatado.
   */
  getProdutoByCodigo(codigo: string): Observable<Produto[]> {
    const empresa = localStorage.getItem('empresa');
    const link = `${ENV.WS_PRODUTO}${API_URL}list/${empresa}?filter=${codigo}`;
    return this.http.get<any>(link).pipe(
      map((result) => {
        return this.formataProdutos(result.content);
      })
    );
  }

  /**
   * @author helio.souza
   * @description Retorna objetos de produtos formatados.
   * @param produtos Objetos do serviço JAVA.
   * @returns Produtos formatados.
   */
  formataProdutos(produtos: any[]): Produto[] {
    return produtos.map((produto) => {
      return {
        avariadoStatus: produto.avariadoStatus,
        cgcFornecedor: produto.cgc_fornecedor,
        codProduto: produto.cod_produto,
        codbarean13: produto.codbarean13,
        codigo: produto.codigo,
        codigoBase: produto.codigoBase,
        codigoFC: produto.codigoFC,
        codigoForn: produto.codigoForn,
        codigoFornecedorBase: produto.codigoFornecedorBase,
        codigodigito: produto.codigodigito,
        codigodigitoembalagem: produto.codigodigitoembalagem,
        conversao: produto.conversao,
        desconto: produto.desconto,
        descricao: produto.descricao,
        descricaoForn: produto.descricaoForn,
        descricaoProd: produto.descricao_prod,
        descricaoSituacao: produto.descricao_situacao,
        estoque: produto.estoque,
        fantas: produto.fantas,
        formaParcelamento: produto.formaParcelamento,
        imagem: produto.imagem,
        inalante: produto.inalante,
        isProdutoBase: produto.isProdutoBase,
        linha: produto.linha,
        link: produto.link,
        precoPorUnidade: produto.precoPorUnidade,
        precoSemDesconto: produto.precoSemDesconto,
        prvd1: produto.prvd1,
        qtdDecimal: produto.qtdDecimal,
        qtdMaxParcelas: produto.qtdMaxParcelas,
        qtdMinima: produto.qtdMinima,
        qtdImagens: produto.qtd_imagens,
        qtdpages: produto.qtdpages,
        situacao: produto.situacao,
        totalElements: produto.totalElements,
        unidade: produto.unidade,
        valorParcela: produto.valorParcela,
      } as Produto;
    });
  }

  // by Ryuge 18/09/2018
  // edit by Helio 19/03/2020
  public getAllListImage(codigo: string): Promise<any> {
    const link = ENV.WS_PRODUTO + API_URL + 'listImages/' + codigo;
    return this.http.get<any>(link).toPromise();
  }

  // edit by Helio 19/03/2020
  public getProductInfomation(codigoProduto: string): Promise<any> {
    const link = ENV.WS_PRODUTO + API_URL + 'detalhe/' + codigoProduto;
    return this.http.get<any>(link).toPromise();
  }
}
