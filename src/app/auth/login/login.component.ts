import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

import { ScriptsService } from '../../services/scripts.service';
import { AuthService } from '../../services/auth.service';

import { Usuario } from 'src/app/models/usuario.model';

declare function initInputs(): any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public cargando: boolean;
  public mostrarPassword: boolean;

  public faEye = faEye;
  public faEyeSlash = faEyeSlash;
  public faLightbulb = faLightbulb;

  constructor(private scriptsService: ScriptsService,
              private authService: AuthService) {
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
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  iniciarSesion(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.cargando = true;

      const usuario: Usuario = new Usuario();
      usuario.username = this.form.get('username').value;
      usuario.password = this.form.get('password').value;

      this.authService.login(usuario).subscribe((resp: any) => {
        this.authService.guardarDatosSesion(resp.token);
        this.authService.paginaInicio();
        this.cargando = false;
      }, err => {
        if (err.status === 404 || err.status === 500) {
          Swal.fire('Error', err.error.mensaje, 'error');
        } else if (err.status === 400) {
          Swal.fire('Error de credenciales', 'Username o password incorrectos!', 'error');
        }
        this.cargando = false;
        console.log(err);
      });
    }
  }

}
