import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserModel, AuthService } from 'src/app/modules/auth';
import { HtmlToPDFService } from 'src/app/services/base/htmlToPdf/html-to-pdf.service';
import { MessagesService } from 'src/app/services/base/messages/messages.service';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';
import { RelatoriosService } from 'src/app/services/relatorios/relatorios.service';
import { SensoresService } from 'src/app/services/sensores/sensores.service';

@Component({
  selector: 'app-relatorios-sensor-media',
  templateUrl: './relatorios-sensor-media.component.html',
  styleUrls: ['./relatorios-sensor-media.component.scss']
})

export class RelatoriosSensorMediaComponent implements OnInit {
  page: string = "sensores";
  items: any;
  itemsAux: any;
  selectedItems: any = [];
  searchChangeObserver: any;

  checkedSelectAll: boolean;
  showLoadingSpinner: boolean = false;
  user$: Observable<UserModel> | any;
  empresas: any[];
  sensores: any[];
  todayDate: string = (new Date()).toISOString().substring(0, 10);
  data_fim: any;
  data_inicio: any;
  gaugeOptions = this.sensoresService.gaugeOptions;

  constructor(
    private service: RelatoriosService,
    private messages: MessagesService,
    public userService: AuthService,
    private cdf: ChangeDetectorRef,
    private empresasService: EmpresasService,
    private sensoresService: SensoresService,
    private htmlToPdf: HtmlToPDFService,
  ) {
    this.userService.currentUserSubject.asObservable().subscribe((data: any) => {
      this.user$ = data.data;
    });
    this.empresas = this.empresasService.empresas;
  }

  async ngOnInit(): Promise<void> {
    this.data_inicio = this.todayDate;
    this.data_fim = this.todayDate;
  }

  async findSensors(id_empresa: number) {
    const response = await this.sensoresService.getAllByEmpresa(id_empresa, true);
    this.sensores = response;
    this.cdf.detectChanges();
  }

  async createReport(f: NgForm) {
    this.messages.swalLoading();
    if (f.valid) {
      const values = f.value;
      const response = await this.service.getMedia(values);
      this.items = response;
      this.cdf.detectChanges();
      this.messages.swalClose();
      return;
    }
    this.messages.toastError();
  }

  async generatePDF(f: NgForm) {
    this.messages.swalLoading();
    if (f.valid) {
      const values = JSON.parse(JSON.stringify(f.value));
      values.format = 'html';
      const response = await this.service.getMedia(values);
      this.htmlToPdf.createByString(response, false,'media');
      this.messages.swalClose();
      return;
    }
    this.messages.toastError();
  }
}
