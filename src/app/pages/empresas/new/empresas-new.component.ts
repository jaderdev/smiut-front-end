import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessagesService } from 'src/app/services/base/messages/messages.service';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';

@Component({
  selector: 'app-empresas-new',
  templateUrl: './empresas-new.component.html',
  styleUrls: ['./empresas-new.component.scss']
})
export class EmpresasNewComponent implements OnInit {
  stayOnPage = false;
  page: string = "empresas";

  item: any = {};

  categorias: any;
  tabs = {
    BASIC_TAB: 0,
    SENSORES_TAB: 1,
    FUNCIONARIOS_TAB: 2,
  };

  activeTabId = this.tabs.BASIC_TAB;
  TopOptions: any = {
    page: this.page,
    name: this.item.nome,
  };
  constructor(
    private service: EmpresasService,
    private messages: MessagesService,
    private router: Router,
    private cdf: ChangeDetectorRef
  ) { }

  async ngOnInit(): Promise<void> { }

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
      this.service.empresas.push({
        id: response.data.id,
        primeiro_nome: f.value.primeiro_nome
      });
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
    if (value) {
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
