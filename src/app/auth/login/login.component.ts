import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

import { ScriptsService } from '../../services/scripts.service';

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

  constructor(private scriptsService: ScriptsService) {
    this.cargando = false;
    this.mostrarPassword = false;
  }

  ngOnInit(): void {
    this.scriptsService.load('login').then(resp => console.log(resp)).catch(e => console.log(e));
    this.configurarForm();
  }

  configurarForm(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  iniciarSesion(): void {
  }

}
