import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MessagesService } from "src/app/services/base/messages/messages.service";
import { thumbsNoImage } from "src/environments/thumbs";

@Component({
  selector: "files-upload-item",
  templateUrl: "./files-upload-item.component.html",
  styleUrls: ["./files-upload-item.component.scss"],
})
export class FilesUploadItemComponent implements OnInit {
  noFile: string = thumbsNoImage.file;
  uploaded: boolean = false;
  @Input() file: any;
  @Output() newFile = new EventEmitter();

  constructor(private messages: MessagesService) {}

  ngOnInit(): void {}

  async removeFile() {
    this.file = "";
    this.newFile.emit("");
  }

  async changeFile(event: any) {
    this.messages.swalLoading();
    let file = event.srcElement.files[0];
    this.file = file;
    this.uploaded = true;
    this.newFile.emit(file);
    this.messages.swalClose();
  }
}
