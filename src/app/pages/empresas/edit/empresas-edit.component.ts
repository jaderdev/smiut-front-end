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
  selector: 'app-empresas-edit',
  templateUrl: './empresas-edit.component.html',
  styleUrls: ['./empresas-edit.component.scss']
})
export class EmpresasEditComponent implements OnInit {
  page: string = "empresas";
  item: any = {};
  itemInit: any = {};
  id: number;
  categorias: any;

  tabs = {
    BASIC_TAB: 0,
    SENSORES_TAB: 1,
    FUNCIONARIOS_TAB: 2,
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
  user$: Observable<UserModel> | any;

  constructor(
    private service: EmpresasService,
    private sensorsService: SensoresService,
    private route: ActivatedRoute,
    private messages: MessagesService,
    private router: Router,
    private cdf: ChangeDetectorRef,
    public userService: AuthService,
    private languagesServices: LanguagesService
  ) {
    this.userService.currentUserSubject.asObservable().subscribe((data: any) => {
      this.user$ = data.data;
    });
  }

  async ngOnInit(): Promise<void> {
    if (this.user$.super_administrador == 0) {
      this.activeTabId = this.tabs.SENSORES_TAB;
    } else {
      this.route.params.subscribe(async (params: any) => {
        this.id = params["id"];
        const response = await this.getItem(this.id);
        this.item = response;
        this.itemInit = Object.assign({}, response);

        if (this.item.length == 0) {
          this.router.navigate(['empresas']);
        }
        this.item.deletedItems = [];
        this.cdf.detectChanges();

      });
    }
    this.showLoadingSpinner = false;
  }

  getItem(id: number) {
    const response = this.service.getItem(id);
    return response;
  }

  async save(f: NgForm) {
    this.messages.swalLoading();

    if (f.valid) {
      let emailValidate = false, usernameValidate = false;

      if (this.item.email !== f.value.email) {
        const emailValidate = await this.verifyExist('email', f.value.email);
      }

      if (this.item.username !== f.value.username) {
        const usernameValidate = await this.verifyExist('username', f.value.username);
      }

      if (!usernameValidate || !emailValidate) {
        const response = await this.service.update(this.id, f.value);
        this.service.empresas.filter(a => a.id == this.id)[0].primeiro_nome = f.value.primeiro_nome;
        if (response.message == "success") {
          this.messages.toastSuccess();
          return;
        }
        this.messages.toastError(this.languagesServices.messages.app.error);
        return;
      }
    }
    this.messages.toastError(this.languagesServices.messages.enterprises.fill_form);
  }

  changeTab(tabId: number) {
    this.activeTabId = tabId;
  }

  async deleteItem(id: number): Promise<void> {
    const result = await this.messages.swalConfirmDelete(this.service.MSG_DELETE_ENTERPRISE_CONFIRM);

    if (result.isDismissed) return;

    if (result.value) {
      this.messages.swalLoading();
      const response = await this.delete(id);
      if (response) {
        this.service.empresas = this.service.empresas.filter(a => a.id != id);
        this.messages.toastSuccess();
        window.history.back();
        return;
      }
    }
    this.messages.swalError();
  }

  async delete(id: number) {
    const response = await this.service.delete(id);
    this.messages.swalLoading(this.service.MSG_DELETE_ENTERPRISE_SENSORS);

    const responseSensores = await this.sensorsService.delete(id);

    return response.message !== "error";
  }

  async verifyExist(field: string, value: string) {
    if (value != '' && (this.itemInit[field] != value)) {
      const data = {}
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