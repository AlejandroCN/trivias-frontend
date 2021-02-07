import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // cuando un usuario esté autenticado no se permite que acceda al login
    if (this.authService.estaAutenticado()) {
      if (!this.authService.tokenExpirado()) {
        this.authService.paginaInicio();
        return false;
      } else {
        this.authService.logout();
        return true;
      }
    } else {
      return true;
    }
  }

}
