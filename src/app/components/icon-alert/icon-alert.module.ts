import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IconAlertComponent } from './icon-alert.component';

@NgModule({
  declarations: [IconAlertComponent],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  exports: [IconAlertComponent]
})
export class IconAlertModule {}
