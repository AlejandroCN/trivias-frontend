import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

import { faChartBar, faGamepad, faObjectGroup, faQuestion } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    BreadcrumbsComponent
  ]
})
export class SharedModule {

  constructor(library: FaIconLibrary) {
    library.addIcons(faGamepad, faChartBar, faObjectGroup, faQuestion);
  }

}
