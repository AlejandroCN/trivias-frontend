import { NgModule } from '@angular/core';

import { ImagePipe } from './image.pipe';
import { FormatMilisPipe } from './format-milis.pipe';

@NgModule({
  declarations: [ImagePipe, FormatMilisPipe],
  exports: [ImagePipe, FormatMilisPipe],
})
export class PipesModule {}
