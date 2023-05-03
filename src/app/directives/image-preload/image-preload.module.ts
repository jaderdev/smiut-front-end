import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePreloadDirective } from './image-preload.directive';

@NgModule({
  declarations: [
    ImagePreloadDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImagePreloadDirective
  ]
})
export class ImagePreloadModule { }
