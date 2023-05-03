import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel, AuthService } from 'src/app/modules/auth';
import { MessagesService } from 'src/app/services/base/messages/messages.service';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';
import { LanguagesService } from 'src/app/services/languages/languages.service';
import { SensoresService } from 'src/app/services/sensores/sensores.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sensores-edit',
  templateUrl: './sensores-edit.component.html',
  styleUrls: ['./sensores-edit.component.scss']
})
export class SensoresEditComponent implements OnInit {

  page: string = "sensores";
  item: any = {};
  itemInit: any = {};
  id: number;
  categorias: any;

  tabs = {
    BASIC_TAB: 0,
    NOTIFICACAO_TAB: 1
  };

  activeTabId = this.tabs.BASIC_TAB;
  stayOnPage: boolean = false;
  tipos: any;
  TopOptions = {
    page: this.page,
    name: this.item.nome,
  };
  showLoadingSpinner = true;
  uploadPath = `${environment.urlUploads}`;
  empresas: any;
  user$: Observable<UserModel> | any;

  constructor(
    private service: SensoresService,
    private route: ActivatedRoute,
    private messages: MessagesService,
    private cdf: ChangeDetectorRef,
    private empresasService: EmpresasService,
    public userService: AuthService,
    private languagesServices: LanguagesService
  ) {
    this.userService.currentUserSubject.asObservable().subscribe((data: any) => {
      this.user$ = data.data;
    });
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params: any) => {
      this.id = params["id"];
      const response = await this.getItem(this.id);
      this.item = response;
      this.itemInit = Object.assign({}, response);

      if (this.item.length == 0) {
        window.history.back();
      }

      this.empresas = this.user$.super_administrador == 1 ? this.empresasService.empresas : [];

      if (this.user$.super_administrador == 0) {
        this.activeTabId = this.tabs.NOTIFICACAO_TAB;
      }
      this.item.deletedItems = [];
      this.showLoadingSpinner = false;
      this.cdf.detectChanges();
    });
  }

  getItem(id: number) {
    let response = this.service.getItem(id);
    return response;
  }

  async save(f: NgForm) {
    if (f.valid) {
      const deviceIdValidate = await this.verifyExist('deviceid', f.value.username);

      if (deviceIdValidate == undefined) return;

      this.messages.swalLoading();
      let response = await this.service.update(this.id, f.value);
      if (response.message == "success") {
        this.messages.toastSuccess();
        if (!this.stayOnPage) {
          window.history.back();
        }
        return;
      }
      this.messages.toastError(this.languagesServices.messages.app.error);
      return;
    }
    this.messages.toastError(this.languagesServices.messages.enterprises.fill_form);
  }

  changeTab(tabId: number) {
    this.activeTabId = tabId;
  }
  async verifyExist(field: string, value: string) {
    if (value != '' && (this.itemInit[field] != value)) {
      let data = {}
      data[field] = value;
      this.messages.toastLoading();

      const response = await this.service.verify(data);

      if (response.exist) {
        this.messages.swalError(`${field} já existe`);
        this.item[field] = this.itemInit[field];
        this.cdf.detectChanges();
        return true;
      }
      this.messages.swalClose();
      return false;
    }
  }
}