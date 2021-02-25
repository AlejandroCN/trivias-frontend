import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.estaAutenticado()) {
      if (!this.authService.tokenExpirado()) {
        this.authService.paginaInicio();
        return true;
      } else {
        this.authService.errorDeAutenticacion();
        return false;
      }
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }

}
