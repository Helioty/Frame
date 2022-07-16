import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common/common.service';
import { has } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(
    private readonly http: HttpClient,
    private readonly common: CommonService
  ) {}

  /**
   * @author helio.souza
   * @description HTTP Get com opções de Error Handler e Token.
   * @param url LINK de acesso ao serviço.
   * @param options Se vai usar o token e se vai usar o show error.
   * @param headers Headers da requisição.
   * @returns Observable T type.
   */
  get<T>(
    url: string,
    options = { token: true, showError: true },
    headers?: HttpHeaders
  ): Observable<T> {
    if (options.token && headers) {
      headers.set('x-auth-token', localStorage.getItem('token'));
    } else if (options.token) {
      headers = new HttpHeaders().set('x-auth-token', localStorage.getItem('token'));
    }
    return this.http.get<T>(url, { headers }).pipe(
      catchError((err) => {
        if (options.showError) {
          this.showError(err);
        }
        throw err;
      })
    );
  }

  /**
   * @author helio.souza
   * @description HTTP Post com opções de Error Handler e Token.
   * @param url LINK de acesso ao serviço.
   * @param body Body da requisição.
   * @param options Se vai usar o token e se vai usar o show error.
   * @param headers Headers da requisição.
   * @returns Observable T type.
   */
  post<T, B>(
    prop: { url: string; body: B },
    options = { token: true, showError: true },
    headers?: HttpHeaders
  ): Observable<T> {
    if (options.token && headers) {
      headers.set('x-auth-token', localStorage.getItem('token'));
    } else if (options.token) {
      headers = new HttpHeaders().set('x-auth-token', localStorage.getItem('token'));
    }
    return this.http.post<T>(prop.url, prop.body, { headers }).pipe(
      catchError((err) => {
        if (options.showError) {
          this.showError(err);
        }
        throw err;
      })
    );
  }

  /**
   * @author helio.souza
   * @description HTTP Put com opções de Error Handler e Token.
   * @param url LINK de acesso ao serviço.
   * @param body Body da requisição.
   * @param options Se vai usar o token e se vai usar o show error.
   * @param headers Headers da requisição.
   * @returns Observable T type.
   */
  put<T, B>(
    prop: { url: string; body: B },
    options = { token: true, showError: true },
    headers?: HttpHeaders
  ): Observable<T> {
    if (options.token && headers) {
      headers.set('x-auth-token', localStorage.getItem('token'));
    } else if (options.token) {
      headers = new HttpHeaders().set('x-auth-token', localStorage.getItem('token'));
    }
    return this.http.put<T>(prop.url, prop.body, { headers }).pipe(
      catchError((err) => {
        if (options.showError) {
          this.showError(err);
        }
        throw err;
      })
    );
  }

  /**
   * @author helio.souza
   * @description HTTP Delete com opções de Error Handler e Token.
   * @param url LINK de acesso ao serviço.
   * @param options Se vai usar o token e se vai usar o show error.
   * @param headers Headers da requisição.
   * @returns Observable T type.
   */
  delete<T>(
    url: string,
    options = { token: true, showError: true },
    headers?: HttpHeaders
  ): Observable<T> {
    if (options.token && headers) {
      headers.set('x-auth-token', localStorage.getItem('token'));
    } else if (options.token) {
      headers = new HttpHeaders().set('x-auth-token', localStorage.getItem('token'));
    }
    return this.http.delete<T>(url, { headers }).pipe(
      catchError((err) => {
        if (options.showError) {
          this.showError(err);
        }
        throw err;
      })
    );
  }

  /**
   * @author helio.souza
   * @param error HttpErrorResponse.
   */
  showError(error: HttpErrorResponse): void {
    console.log(error);
    if (has(error, 'error.detail')) {
      this.common.showAlertError('Atenção!', error.error.detail);
    } else if (has(error, 'error.error') && has(error, 'error.message')) {
      this.common.showAlertError(error.error.error, error.error.message);
    } else if (error.status === 0) {
      this.common.showAlertError(error.statusText, error.message);
    } else {
      this.common.showAlertError('Atenção!', JSON.stringify(error));
    }
  }
}
