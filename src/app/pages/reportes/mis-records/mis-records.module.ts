import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisRecordsRoutingModule } from './mis-records-routing.module';
import { MisRecordsComponent } from './mis-records.component';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { TablaRecordsModule } from 'src/app/components/tabla-records/tabla-records.module';
import { IconAlertModule } from 'src/app/components/icon-alert/icon-alert.module';

@NgModule({
  declarations: [MisRecordsComponent],
  imports: [
    CommonModule,
    MisRecordsRoutingModule,
    SpinnerModule,
    TablaRecordsModule,
    IconAlertModule,
  ],
})
export class MisRecordsModule {}
