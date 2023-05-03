import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  Observable } from 'rxjs';
import { UserModel, AuthService } from 'src/app/modules/auth';
import { FunctionsService } from 'src/app/services/base/functions/functions.service';
import { HtmlToPDFService } from 'src/app/services/base/htmlToPdf/html-to-pdf.service';
import { MessagesService } from 'src/app/services/base/messages/messages.service';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';
import { RelatoriosService } from 'src/app/services/relatorios/relatorios.service';
import { SensoresService } from 'src/app/services/sensores/sensores.service';

@Component({
  selector: 'app-relatorios-sensor-intervalo-tempo',
  templateUrl: './relatorios-sensor-intervalo-tempo.component.html',
  styleUrls: ['./relatorios-sensor-intervalo-tempo.component.scss']
})
export class RelatoriosSensorIntervaloTempoComponent implements OnInit {
  page: string = "sensores";
  items: any;
  itemsAux: any;
  selectedItems: any = [];
  searchChangeObserver: any;

  checkedSelectAll: boolean;
  showLoadingSpinner: boolean = true;
  user$: Observable<UserModel> | any;
  empresas: any[];
  sensores: any[];
  gaugeOptions: any;

  constructor(
    private service: RelatoriosService,
    private messages: MessagesService,
    public userService: AuthService,
    private cdf: ChangeDetectorRef,
    private empresasService: EmpresasService,
    private sensoresService: SensoresService,
    private htmlToPdf: HtmlToPDFService,
    private functionsService: FunctionsService
  ) {
    this.userService.currentUserSubject.asObservable().subscribe((data: any) => {
      this.user$ = data.data;
    });
    this.empresas = this.empresasService.empresas;
    this.gaugeOptions = this.sensoresService.gaugeOptions;

  }

  async ngOnInit() {
    this.showLoadingSpinner = false;
  }

  async findSensors(id_empresa: number) {
    const response = await this.sensoresService.getAllByEmpresa(id_empresa, true);
    this.sensores = response;
  }
  async onSubmit(f: NgForm) {
    this.messages.swalLoading();
    if (f.valid) {
      const values = f.value;
      const response = await this.service.getIntervaloTempo(values);
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
      const response = await this.service.getIntervaloTempo(values);
      
      const auxData = this.functionsService.formatToBrDate(f.value.data_fim)
      const name = this.functionsService.beautifyURL(`relatorio-diario-${auxData}`);

      this.htmlToPdf.createByString(response, false,name);
      this.messages.swalClose();
      return;
    }
    this.messages.toastError();
  }
}
