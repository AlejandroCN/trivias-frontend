import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablaRecordsComponent } from './tabla-records.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [TablaRecordsComponent],
  imports: [CommonModule, PipesModule],
  exports: [TablaRecordsComponent],
})
export class TablaRecordsModule {}
