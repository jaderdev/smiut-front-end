import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ImagePreloadDirective } from 'src/app/directives/image-preload/image-preload.directive';
import { ImagePreloadModule } from 'src/app/directives/image-preload/image-preload.module';
import { GalleryImageComponent } from './gallery-image/gallery-image.component';
import { GalleryListComponent } from './gallery-list/gallery-list.component';

@NgModule({
  declarations: [
    GalleryImageComponent,
    GalleryListComponent,
  ],
  imports: [
    ImagePreloadModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
    InlineSVGModule.forRoot(),
  ],
  exports: [
    GalleryImageComponent,
    GalleryListComponent,
  ]
})
export class GalleryModule { }
