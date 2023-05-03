import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel, AuthService } from 'src/app/modules/auth';
import { DadosEmpresaService } from 'src/app/services/base/dados-empresa/dados-empresa.service';
import { MessagesService } from 'src/app/services/base/messages/messages.service';
import { SensoresService } from 'src/app/services/sensores/sensores.service';

@Component({
  selector: 'app-dados-empresa',
  templateUrl: './dados-empresa.component.html',
  styleUrls: ['./dados-empresa.component.scss']
})
export class DadosEmpresaComponent implements OnInit {
  stayOnPage = false;
  page: string = "Dados empresariais";

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
    private messages: MessagesService,
    public userService: AuthService,
    private router: Router,
    private cdf: ChangeDetectorRef,
    private service: DadosEmpresaService

  ) {
    this.userService.currentUserSubject.asObservable().subscribe((data: any) => {
      this.user$ = data.data;
    });
  }
  async ngOnInit(): Promise<void> {
    if (this.user$.super_administrador == 0) {
      window.history.back();
    } else {
      const response = await this.getItem();
      this.item = response;
      this.cdf.detectChanges();
    }
  }

  getItem() {
    const response = this.service.getItem();
    return response;
  }

  async save(f: NgForm) {
    if (f.valid) {
      this.messages.swalLoading();
      const response = await this.service.update(f.value);
      if (response.message == "success") {
        this.messages.toastSuccess();
        return;
      }
    }
    this.messages.toastError();
  }

  changeTab(tabId: number) {
    this.activeTabId = tabId;
  }
}
