import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../login/login.component.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  public cargando: boolean;

  constructor() {
    this.cargando = false;
  }

  ngOnInit(): void {
    this.configurarForm();
  }

  configurarForm(): void {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
        // Validators.pattern(this.validation.alfaNum)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(80),
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        // Validators.pattern(this.validation.alfaNum)
      ])
    });
  }

  registrar(): void {
  }

  construirUsuario(): any {

  }

}
