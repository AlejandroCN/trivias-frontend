import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JugarTriviaComponent } from './jugar-trivia.component';
import { JugarTriviaRoutingModule } from './jugar-trivia-routing.module';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { FormTriviaModule } from 'src/app/components/form-trivia/form-trivia.module';
import { IconAlertModule } from 'src/app/components/icon-alert/icon-alert.module';

@NgModule({
  declarations: [JugarTriviaComponent],
  imports: [
    CommonModule,
    SpinnerModule,
    JugarTriviaRoutingModule,
    FormTriviaModule,
    IconAlertModule,
  ],
})
export class JugarTriviaModule {}
