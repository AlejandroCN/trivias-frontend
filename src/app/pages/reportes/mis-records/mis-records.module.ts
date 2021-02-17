import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MisRecordsRoutingModule } from './mis-records-routing.module';
import { MisRecordsComponent } from './mis-records.component';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { TablaRecordsModule } from 'src/app/components/tabla-records/tabla-records.module';

@NgModule({
  declarations: [MisRecordsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MisRecordsRoutingModule,
    SpinnerModule,
    TablaRecordsModule,
  ],
})
export class MisRecordsModule {}
