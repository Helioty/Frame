import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private logged = false;

  constructor(private router: Router, private common: CommonService) {}

  canActivate(): boolean {
    if (!this.logged) {
      this.common.showAlert('Atenção!', 'Login necessário!');
      this.router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }

  /**
   * @description Retorna o estado do login.
   */
  get logStatus(): boolean {
    return this.logged;
  }

  /**
   * @description Seta o estado do login.
   */
  set setStatus(st: boolean) {
    this.logged = st;
  }
}
