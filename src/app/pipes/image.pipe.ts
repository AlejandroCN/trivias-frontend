import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(urlImage: string): string {
    return urlImage ? urlImage : 'assets/images/noimage.png';
  }

}
