import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { ValidationService } from '../../services/validation.service';
import { Respuesta } from 'src/app/models/respuesta.model';

@Component({
  selector: 'app-form-respuestas',
  templateUrl: './form-respuestas.component.html',
  styleUrls: ['./form-respuestas.component.css'],
})
export class FormRespuestasComponent implements OnChanges, OnInit {
  @Input() public respuestas: Respuesta[];

  @Input() public form: FormGroup;
  public colores = ['success', 'primary', 'secondary', 'warning', 'danger'];

  constructor(private fb: FormBuilder, private validation: ValidationService) {}

  ngOnInit(): void {
    this.configurarForm();
    this.addDynamicControls();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.respuestas.isFirstChange()) {
      if (this.respuestas.length > 0) {
        if (this.respuestas.find((r) => r.id > 0)) {
          this.poblarFormulario();
        }
      }
    }
  }

  private configurarForm(): void {
    this.form.addControl('inputs', this.fb.array([]));
    this.form.addControl(
      'checks',
      this.fb.array([], this.validation.respuestaSeleccionada())
    );
  }

  private addDynamicControls(): void {
    // el formControlName de cada control será el índice del arreglo
    for (let i = 0; i < 5; i++) {
      this.inputs.push(
        this.fb.control('', [Validators.required, Validators.maxLength(255)])
      );
      this.checks.push(this.fb.control(false));
    }
  }

  private poblarFormulario(): void {
    const checkControls: AbstractControl[] = this.checks.controls;
    const inputControls: AbstractControl[] = this.inputs.controls;
    this.respuestas.forEach((resp, index) => {
      checkControls[index].setValue(resp.correcta);
      inputControls[index].setValue(resp.respuesta);
    });
  }

  public onCheckChange(index: number) {
    this.checks.controls.forEach((control, i) => {
      if (control.value && i !== index) {
        control.setValue(false);
      }
    });
  }

  get inputs(): FormArray {
    return this.form.get('inputs') as FormArray;
  }

  get checks(): FormArray {
    return this.form.get('checks') as FormArray;
  }
}
