import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { SidebarService } from '../../services/sidebar.service';

import { Menu } from '../../models/menu.interface';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public menus: Menu[] = [];
  public usuario: Usuario;

  constructor(private authService: AuthService,
              private sidebarService: SidebarService) {
    this.usuario = this.authService.usuario;
  }

  ngOnInit(): void {
    this.sidebarService.obtenerMenus().subscribe(menus => {
      this.menus = menus;
    }, err => {
      console.log(err);
    });
  }

  permisoConcedido(menu: Menu): boolean {
    return menu.roles.find((r) => r === this.usuario.rol.nombre) ? true : false;
  }

}
