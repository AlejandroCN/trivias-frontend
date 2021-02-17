import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopTenComponent } from './top-ten.component';
import { TopTenRoutingModule } from './top-ten-routing.module';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { TablaRecordsModule } from 'src/app/components/tabla-records/tabla-records.module';
import { IconAlertModule } from 'src/app/components/icon-alert/icon-alert.module';

@NgModule({
  declarations: [TopTenComponent],
  imports: [
    CommonModule,
    TopTenRoutingModule,
    SpinnerModule,
    TablaRecordsModule,
    IconAlertModule,
  ],
})
export class TopTenModule {}
