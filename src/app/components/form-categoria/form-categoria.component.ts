import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ValidationService } from 'src/app/services/validation.service';

import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-form-categoria',
  templateUrl: './form-categoria.component.html',
  styles: [
  ]
})
export class FormCategoriaComponent implements OnChanges {

  // Categoria no nula, pasada desde el padre para determinar si se está creando o editando
  @Input() private categoria: Categoria;

  public form: FormGroup;

  constructor(private validation: ValidationService) {
    this.configurarForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.categoria.isFirstChange()) {
      if (this.categoria.id > 0) {
        this.poblarFormulario();
      }
    }
  }

  private configurarForm(): void {
    this.form = new FormGroup({
      categoria: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
        Validators.pattern(this.validation.alfaNumEspaciosAcentos)
      ]),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(150),
        Validators.pattern(this.validation.alfaNumEspaciosAcentos)
      ])
    });
  }

  private poblarFormulario(): void {
    this.form.get('categoria').setValue(this.categoria.categoria);
    this.form.get('descripcion').setValue(this.categoria.descripcion);
  }

  public poblarCategoria(): boolean {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.construirCategoria();
      return true;
    }
    return false;
  }

  public desactivarInputs(): void {
    this.form.get('categoria').disable();
    this.form.get('descripcion').disable();
  }

  private construirCategoria(): void {
    this.categoria.categoria = this.form.get('categoria').value.trim().replace(/\s\s+/g, ' ');
    this.categoria.descripcion = this.form.get('descripcion').value.trim().replace(/\s\s+/g, ' ');
  }

}
