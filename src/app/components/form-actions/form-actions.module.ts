import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormActionsComponent } from './form-actions.component';

@NgModule({
  declarations: [FormActionsComponent],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [FormActionsComponent]
})
export class FormActionsModule { }
