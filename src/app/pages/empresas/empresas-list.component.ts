import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MessagesService } from 'src/app/services/base/messages/messages.service';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';

@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  styleUrls: ['./empresas-list.component.scss']
})
export class EmpresasListComponent implements OnInit {
  page: string = "empresas";
  items: any;
  itemsAux: any;
  selectedItems: any = [];
  searchChangeObserver: any;
  private _searchableFields = ["id", "nome"];

  private _subscriptions: Subscription[] = [];
  checkedSelectAll: boolean;
  showLoadingSpinner: boolean = true;

  constructor(
    private service: EmpresasService,
    private messages: MessagesService,
    private cdf: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    this.items = await this.getData();
    this.items.map((a) => {
      a.ativo = a.ativo == 1;
    });
    this.itemsAux = [...this.items];
    this.showLoadingSpinner = false;
    this.cdf.detectChanges();
  }

  async getData() {
    let response = this.service.getAll();
    return response;
  }

  async updateData(id: number, data: any) {
    let response = this.service.update(id, data);
    return response;
  }

  async delete(id: number) {
    let response = await this.service.delete(id);
    return response.message !== "error";
  }

  async switchChange(e: any, item: any, field: string = "ativo") {
    this.messages.toastLoading();
    let data = {};
    data[field] = e.srcElement.checked;
    let response = await this.updateData(item.id, data);

    if (response.message == "success") {
      this.messages.toastSuccess();
      this.itemsAux = [...this.items];
      return;
    }
    item[field] = !e.srcElement.checked;
    this.cdf.detectChanges();
    this.messages.toastError();
  }

  selectItem(e: any, item: any) {
    if (e.target.checked) {
      this.selectedItems.push(item);
      item.checked = true;
    } else {
      this.selectedItems = this.selectedItems.filter((a) => a.id != item.id);
      item.checked = false;
    }
  }

  selectAll(e: any) {
    this.items.map((a) => (a.checked = e.target.checked));
    if (e.target.checked) {
      this.selectedItems = this.items;
      return;
    }
    this.selectedItems = [];
  }

  filterByStatus(event: any) {
    let item = event.srcElement.value;
    this.items = [...this.itemsAux];
    if (item != "") {
      this.items = this.items.filter((a) => a.visivel == item);
    }
  }

  async deleteChange(id: number): Promise<void> {
    let result = await this.messages.swalConfirmDelete();

    if (result.isDismissed) return;

    if (result.value) {
      this.messages.swalLoading();
      let response = await this.delete(id);
      if (response) {
        //Atualizar pelo javascript
        this.items = this.items.filter((a) => a.id !== id);
        this.itemsAux = [...this.items];

        this.selectedItems = this.selectedItems.filter((a) => a.id != id);

        this.cdf.detectChanges();
        this.messages.toastSuccess();

        return;
      }
    }
    this.messages.swalError();
  }

  async deleteAll() {
    let result = await this.messages.swalConfirmDeleteAll();

    if (result.isDismissed) return;

    if (result.value) {
      this.messages.swalLoading();
      let ids = this.selectedItems.map((a) => a.id).join();
      let response = await this.delete(ids);
      if (response) {
        this.items = this.itemsAux.filter(
          (a) => !ids.split(",").includes(a.id)
        );
        this.itemsAux = [...this.items];

        this.selectedItems = [];
        this.checkedSelectAll = false;

        this.cdf.detectChanges();
        this.messages.toastSuccess();

        return;
      }
    }
    this.messages.swalError();
  }

  onSearchChange(searchValue: string) {
    let newArray;
    if (!this.searchChangeObserver) {
      Observable.create((observer) => {
        this.searchChangeObserver = observer;
      })
        .pipe(debounceTime(300))
        .pipe(distinctUntilChanged())
        .subscribe((response) => {
          response = response.toLowerCase();
          if (response == "") {
            newArray = this.itemsAux;
          } else {
            newArray = this.itemsAux.filter((a) =>
              this._searchableFields.some(
                (b) => a[b]?.toLowerCase().indexOf(response.toLowerCase()) > -1
              )
            );
          }
          this.items = newArray;
          this.cdf.detectChanges();
        });
    }
    this.searchChangeObserver.next(searchValue);
  }

  ngOnDestroy() {
    this._subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
