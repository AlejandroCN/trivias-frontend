import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const roles: string[] = next.data.roles as string[];
    if (this.authService.estaAutenticado()) {
      if (!this.authService.tokenExpirado()) {
        if (this.authService.tieneRol(roles)) {
          return true;
        } else {
          this.authService.accesoDenegado();
          return false;
        }
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
