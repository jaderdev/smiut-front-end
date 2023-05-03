import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageUploadService } from 'src/app/services/base/uploads/images/image-upload.service';
import { MessagesService } from 'src/app/services/base/messages/messages.service';

@Component({
  selector: 'gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.scss']
})
export class GalleryListComponent implements OnInit {
  @Input() items: any = [];
  @Input() deletedItems: any = [];
  @Input() uploadPath: string;
  @Output() newImages = new EventEmitter();

  itemsAux: any;
  selectedItems: any = [];
  searchChangeObserver: any;
  toUpload: boolean = false;
  parentPage: string;
  checkedSelectAll: boolean;

  constructor(
    private modalService: NgbModal,
    private messages: MessagesService,
    private cdf: ChangeDetectorRef,
    private service: ImageUploadService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.parentPage = this.router.url.split("/")[1];
  }

  ngOnInit(): void {
    this.items ??= [];
    this.items?.map(a => {
      a.visivel = a.visivel == 1;
      a.url = this.uploadPath + a.url
    });
    this.itemsAux = [...this.items];
  }

  async deleteSelected() {
    let ids = this.selectedItems.map(a => a.id).join();

    this.items = this.itemsAux.filter(a => !ids.split(',').includes(a.id));
    this.itemsAux = [...this.items];

    this.selectedItems = [];
    this.checkedSelectAll = false;

    this.deletedItems.push(ids);
    this.newImages.emit(this.items);
  }

  selectItem(e: any, item: any) {
    if (e.target.checked) {
      this.selectedItems.push(item);
      item.checked = true;
    } else {
      this.selectedItems = this.selectedItems.filter(a => a.id != item.id)
      item.checked = false;
    }
  }

  selectAll(e: any) {
    this.items.map(a => a.checked = e.target.checked);
    if (e.target.checked) {
      this.selectedItems = this.items;
      return;
    }
    this.selectedItems = [];
  }

  async deleteChange(id: number): Promise<void> {
    this.items = this.items.filter(a => a.id !== id);
    this.itemsAux = [...this.items];

    this.selectedItems = this.items.filter(a => a.checked);
    this.deletedItems.push(id);
    this.newImages.emit(this.items);
  }

  deleteImageBeforeUpload(item: any) {
    this.items = this.items.filter(a => a != item);
  }
  refreshUploadedImages(data: any) {
    this.items = this.items.filter(a => !a.toUpload).concat(data)
  }

  openFileSelect() {
    document.getElementById("imageSelect").click();
  }

  addImageToList($event) {
    let files = $event.target.files;
    let image: any;
    let file: any;
    Object.entries(files).forEach((k, v) => {
      file = k[1];
      let url = URL.createObjectURL(file);
      image = {
        url: this.sanitizer.bypassSecurityTrustUrl(url),
        nome: file['name'],
        ordem: 99,
        toUpload: 1,
        file: file,
      }
      this.items.push(image);
      this.newImages.emit(this.items);
    });

    this.messages.swalClose();
    this.toUpload = true;
  }


  async openModalEdit(event: any, url: string = ""): Promise<void> {
    /*     let response = await this.service.imgUrlToBase64(`${this.options.uploadPath}${url}`);
    
        let modalRef = this.modalService.open(ImagePopupCropComponent, { size: 'lg' });
        modalRef.componentInstance.url = `${this.options.uploadPath}${url}`;
        modalRef.componentInstance.image = response;
        modalRef.result.then((result) => {
          if (result) {
            console.log(result);
          }
        }); */
  }
}
