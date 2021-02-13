import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SpinnerComponent } from './spinner.component';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    FontAwesomeModule
  ],
  exports: [SpinnerComponent]
})
export class SpinnerModule { }
