import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormTriviaComponent } from './form-trivia.component';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { SpinnerModule } from '../spinner/spinner.module';

@NgModule({
  declarations: [FormTriviaComponent],
  imports: [CommonModule, RouterModule, PipesModule, SpinnerModule],
  exports: [FormTriviaComponent],
})
export class FormTriviaModule {}
