import { NgModule } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

import { faEdit, faTrash, faSpinner, faSave, faSync } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule {

  constructor(library: FaIconLibrary) {
    library.addIcons(faTrash, faEdit, faSpinner, faSave, faSync);
  }

}
