import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  public logged = false;

  constructor(private router: Router, private common: CommonService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.logged) {
      this.common.showAlertInfo('Login necessário!');
      return this.router.navigateByUrl('/login');
    } else {
      return true;
    }

  }

}
