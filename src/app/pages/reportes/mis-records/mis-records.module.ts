import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MisRecordsRoutingModule } from './mis-records-routing.module';
import { MisRecordsComponent } from './mis-records.component';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [MisRecordsComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MisRecordsRoutingModule,
    SpinnerModule,
    PipesModule,
  ],
})
export class MisRecordsModule {}
