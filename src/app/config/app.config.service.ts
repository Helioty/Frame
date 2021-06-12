import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../services/base-service.service";
import { IEnvironment } from "./app.config.interface";

export let API_URL = '';

export const ENV: IEnvironment = {
  WS_AUTH: "https://login.",
  WS_VERSION: "",
  WS_PRODUTO: "https://produto.",
  WS_CRM: "https://crm.",
  WS_VENDAS: "https://vendas.",
  WS_PUBLIC: "https://publico.",
  WS_COMMONS: "https://comum.",
};

@Injectable({
  providedIn: "root",
})
export class AppConfigService {
  constructor(private http: BaseService) {}

  /**
   * @author helio.souza
   * @description Retorna um Promise com a API_URL utilizada na rede.
   * @returns API_URL.
   */
  public getURL(): Promise<string> {
    const apiUrl = environment.urlService;
    const options = { token: false, showError: true };
    return new Promise((resolve, reject) => {
      this.http.get<{ server: string }>(apiUrl, options).subscribe({
        next: (response) => {
          localStorage.setItem("API_URL", response.server + "/");
          console.log("Conected to", response.server);
          API_URL = response.server + "/";
          resolve(API_URL);
        },
        error: (err) => {
          if (localStorage.getItem("API_URL")) {
            API_URL = localStorage.getItem("API_URL");
            resolve(API_URL);
          } else {
            reject(err);
          }
        },
      });
    });
  }
}
