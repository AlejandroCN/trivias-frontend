import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { faEye, faEyeSlash, faLightbulb } from '@fortawesome/free-solid-svg-icons';

import { ValidationService } from '../../services/validation.service';
import { ScriptsService } from '../../services/scripts.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  public cargando: boolean;
  public mostrarPassword: boolean;

  public faEye = faEye;
  public faEyeSlash = faEyeSlash;
  public faLightbulb = faLightbulb;

  constructor(private validation: ValidationService,
              private scriptsService: ScriptsService) {
    this.cargando = false;
    this.mostrarPassword = false;
  }

  ngOnInit(): void {
    this.scriptsService.load('login').then(resp => console.log(resp)).catch(e => console.log(e));
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
  }

  construirUsuario(): any {

  }

}
