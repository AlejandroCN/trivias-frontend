import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { JugarTriviaComponent } from './jugar-trivia.component';
import { JugarTriviaRoutingModule } from './jugar-trivia-routing.module';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { FormTriviaModule } from 'src/app/components/form-trivia/form-trivia.module';

@NgModule({
  declarations: [JugarTriviaComponent],
  imports: [
    CommonModule,
    SpinnerModule,
    FontAwesomeModule,
    JugarTriviaRoutingModule,
    FormTriviaModule,
  ],
})
export class JugarTriviaModule {}
