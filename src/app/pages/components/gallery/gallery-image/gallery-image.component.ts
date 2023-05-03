import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ImageUploadService } from "src/app/services/base/uploads/images/image-upload.service";
import { MessagesService } from "src/app/services/base/messages/messages.service";
import { thumbsNoImage } from "src/environments/thumbs";

@Component({
  selector: "gallery-image",
  templateUrl: "./gallery-image.component.html",
  styleUrls: ["./gallery-image.component.scss"],
})
export class GalleryImageComponent implements OnInit {
  noImg: string = thumbsNoImage.all;

  @Input() image: any;
  @Output() newImage = new EventEmitter();

  constructor(
    private messages: MessagesService,
    private sanitizer: DomSanitizer,
    private service: ImageUploadService
  ) {}

  ngOnInit(): void {}

  async removeImage() {
    this.image = this.noImg;
    this.newImage.emit("");
  }

  async changeImage(event: any) {
    this.messages.swalLoading();
    let aux = URL.createObjectURL(event.srcElement.files[0]);
    this.image = this.sanitizer.bypassSecurityTrustUrl(aux);
    // let imgBase64 = await this.service.imgToBase64(event.srcElement.files[0]);
    this.newImage.emit(event.srcElement.files);

    this.messages.swalClose();
  }
}
