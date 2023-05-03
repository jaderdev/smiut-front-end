import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel, AuthService } from 'src/app/modules/auth';
import { MessagesService } from 'src/app/services/base/messages/messages.service';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';
import { EwelinkService } from 'src/app/services/ewelink/ewelink.service';
import { SensoresService } from 'src/app/services/sensores/sensores.service';

@Component({
  selector: 'app-sensores-new',
  templateUrl: './sensores-new.component.html',
  styleUrls: ['./sensores-new.component.scss']
})
export class SensoresNewComponent implements OnInit {
  stayOnPage = false;
  page: string = "sensores";

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
    private service: SensoresService,
    private messages: MessagesService,
    private empresasService: EmpresasService,
    private router: Router,
    private cdf: ChangeDetectorRef,
    public userService: AuthService
  ) {
    this.userService.currentUserSubject.asObservable().subscribe((data: any) => {
      this.user$ = data.data;
    });
  }

  async ngOnInit(): Promise<void> {
    this.empresas = this.user$.super_administrador == 1 ? this.empresasService.empresas : [];
    this.cdf.detectChanges();
  }

  async save(f: NgForm) {
    this.messages.swalLoading();
    if (f.valid) {

      const deviceID = f.value.deviceid;
      this.messages.swalLoading('Verificando DeviceID');
      const deviceIdValidate = await this.verifyExist('deviceid', deviceID);

      if (deviceIdValidate == undefined) return;

      this.messages.swalLoading('Gravando no sistema');
      const response = await this.service.create(f.value);

      if (!response.error) {
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
