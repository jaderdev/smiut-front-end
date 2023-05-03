import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MessagesService } from 'src/app/services/base/messages/messages.service';
import { EmpresasService } from 'src/app/services/empresas/empresas.service';
import { RelatoriosService } from 'src/app/services/relatorios/relatorios.service';

@Component({
  selector: 'app-relatorio-logs',
  templateUrl: './relatorio-logs.component.html',
  styleUrls: ['./relatorio-logs.component.scss']
})
export class RelatorioLogsComponent implements OnInit {
  page: string = "logs";
  items: any;
  itemsAux: any;
  selectedItems: any = [];
  searchChangeObserver: any;
  checkedSelectAll: boolean;
  showLoadingSpinner: boolean = true;
  empresas: any[];

  constructor(
    private service: RelatoriosService,
    private messages: MessagesService,
    private cdf: ChangeDetectorRef,
    private empresasService: EmpresasService,

  ) {
    this.empresas = this.empresasService.empresas;
  }

  async ngOnInit(): Promise<void> {
    this.showLoadingSpinner = false;
  }

  async onSubmit(f: NgForm) {
    this.messages.swalLoading();
    if (f.valid) {
      const values = f.value;
      let response = await this.service.getLogs(values);
      this.items = response;
      this.cdf.detectChanges();
      this.messages.swalClose();
      return;
    }
    this.messages.toastError();
  }
}
