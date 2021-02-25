import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {
  faEye,
  faEyeSlash,
  faKey,
  faLightbulb,
  faSave,
  faSync,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export class AuthModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faEye, faEyeSlash, faLightbulb, faSave, faSync, faKey);
  }
}
