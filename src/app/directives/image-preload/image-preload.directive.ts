import { Directive, Input, HostBinding } from '@angular/core'
import { thumbsNoImage } from 'src/environments/thumbs';

@Directive({
  selector: 'img[preload]',
  host: {
    '(error)': 'updateUrl()',
    '(load)': 'load()',
    '[src]': 'src'
  }
})

export class ImagePreloadDirective {
  @Input() src: string;
  @HostBinding('class') className
  noImg: string = thumbsNoImage.all;
  imgError: string = thumbsNoImage.error;

  default: string = this.noImg;

  updateUrl() {
    if (!this.src) {
      this.src = this.noImg;
    } else {
      this.src = this.imgError;
    }
  }

  load() {
    this.className = 'image-loaded';
  }
}