import { Component, OnInit } from '@angular/core';
import { IAuth } from 'src/app/services/auth/auth.interface';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'clipboard-outline',
    },
  ];

  public foto: string;
  public nome: string;
  public noPhoto = true;

  constructor(private readonly auth: AuthService) {}

  ngOnInit(): void {
    this.auth.loginEvent.subscribe({
      next: (login: IAuth) => this.restoreLoginInfo(login),
    });
  }

  /**
   * @author helio.souza
   * @description Abre o alert de logout.
   */
  logout(): void {
    this.auth.showAlertLogout();
  }

  /**
   * @author helio.souza
   * @description Pega as informações para exibição.
   */
  private restoreLoginInfo(loginData: IAuth): void {
    this.nome = loginData.nomeDisplay;
    this.foto = loginData.foto;
    if (loginData.foto) {
      this.noPhoto = false;
    }
  }
}
