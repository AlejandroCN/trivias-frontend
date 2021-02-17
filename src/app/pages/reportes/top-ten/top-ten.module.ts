import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { TopTenComponent } from './top-ten.component';
import { TopTenRoutingModule } from './top-ten-routing.module';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { TablaRecordsModule } from 'src/app/components/tabla-records/tabla-records.module';

@NgModule({
  declarations: [TopTenComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    TopTenRoutingModule,
    SpinnerModule,
    TablaRecordsModule,
  ],
})
export class TopTenModule {}
