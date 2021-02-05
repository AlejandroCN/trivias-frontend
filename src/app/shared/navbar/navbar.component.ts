import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faBars } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public faBars = faBars;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

}
