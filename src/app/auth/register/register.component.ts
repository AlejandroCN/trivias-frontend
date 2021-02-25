import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ValidationService } from '../../services/validation.service';
import { ScriptsService } from '../../services/scripts.service';
import { UsuariosService } from '../../services/usuarios.service';

import { Usuario } from '../../models/usuario.model';

declare function initInputs(): any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  public cargando: boolean;
  public mostrarPassword: boolean;

  constructor(private validation: ValidationService,
              private scriptsService: ScriptsService,
              private usuariosService: UsuariosService,
              private router: Router) {
    this.cargando = false;
    this.mostrarPassword = false;
  }

  ngOnInit(): void {
    this.scriptsService.load('login').then(resp => {
      console.log(resp);
      initInputs();
    }).catch(e => console.log(e));
    this.configurarForm();
  }

  configurarForm(): void {
    this.form = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern(this.validation.nombrePropio)
      ]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        Validators.pattern(this.validation.alfaNum)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        Validators.pattern(this.validation.alfaNum)
      ])
    });
  }

  registrar(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.cargando = true;
      this.usuariosService.save(this.construirUsuario()).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Se ha registrado correctamente'
        });
        this.router.navigateByUrl('/auth/login');
        this.cargando = false;
      }, err => {
        Swal.fire('Algo salió muy mal!', err.error.mensaje, 'error');
        this.cargando = false;
      });
    }
  }

  construirUsuario(): Usuario {
    const usuario = new Usuario();
    usuario.nombre = this.form.get('nombre').value.trim().replace(/\s\s+/g, ' ');
    usuario.username = this.form.get('username').value;
    usuario.password = this.form.get('password').value;

    return usuario;
  }

}
