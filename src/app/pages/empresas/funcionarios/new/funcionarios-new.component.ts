import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel, AuthService } from 'src/app/modules/auth';
import { MessagesService } from 'src/app/services/base/messages/messages.service';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';
import { FuncionariosService } from 'src/app/services/funcionarios/funcionarios.service';

@Component({
  selector: 'app-funcionarios-new',
  templateUrl: './funcionarios-new.component.html',
  styleUrls: ['./funcionarios-new.component.scss']
})
export class FuncionariosNewComponent implements OnInit {
  stayOnPage = false;
  page: string = "funcionarios";

  item: any = {};

  categorias: any;
  tabs = {
    BASIC_TAB: 1,
    IMAGENS_TAB: 0,
  };
  activeTabId = this.tabs.BASIC_TAB;
  TopOptions: any = {
    page: this.page,
    name: this.item.nome,
  };
  empresas: any;
  user$: Observable<UserModel> | any;

  constructor(
    private service: FuncionariosService,
    private messages: MessagesService,
    private empresasService: EmpresasService,
    private router: Router,
    private cdf: ChangeDetectorRef,
    public userService: AuthService) {
    this.userService.currentUserSubject.asObservable().subscribe((data: any) => {
      this.user$ = data.data;
    });
  }

  ngOnInit() {
    this.empresas = this.empresasService.empresas;
    this.cdf.detectChanges();
  }

  async save(f: NgForm) {
    this.messages.swalLoading();
    if (f.valid) {
      const usernameValidate = await this.verifyExist('username', f.value.username);
      const emailValidate = await this.verifyExist('email', f.value.email);

      if (usernameValidate == undefined || emailValidate == undefined) {
        this.messages.toastError();
        return;
      }

      let response = await this.service.create(f.value);
      if (response.message == "success") {
        this.messages.toastSuccess();
        if (this.stayOnPage) {
          this.router.navigate([this.page, "edit", response.data.id]);
        } else {
          window.history.back();
        }
        return;
      }
    }
    this.messages.toastError();
  }

  changeTab(tabId: number) {
    this.activeTabId = tabId;
  }

  async verifyExist(field: string, value: string) {
    if (value != '') {
      let data = {}
      data[field] = value;
      this.messages.toastLoading();

      const response = await this.service.verify(data);

      if (response.exist) {
        this.messages.swalError(`${field} já existe`);
        this.item[field] = '';
        this.cdf.detectChanges();
        return true;
      }
      this.messages.swalClose();
      return false;
    }
  }
}
