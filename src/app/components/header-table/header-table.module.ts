import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderTableComponent } from './header-table.component';

@NgModule({
  declarations: [
    HeaderTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    HeaderTableComponent
  ]
})
export class HeaderTableModule { }
