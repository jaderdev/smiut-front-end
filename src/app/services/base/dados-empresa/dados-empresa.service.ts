import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { FunctionsService } from '../functions/functions.service';

@Injectable({
  providedIn: 'root'
})
export class DadosEmpresaService {
  private endpoint: string = "config";
  private id: number = 1;

  constructor(private api: ApiService, private fn: FunctionsService) { }

  async getItem() {
    const response = await this.api.read(`${this.endpoint}`);
    if (!response) {
      this.fn.redirectNoData();
      return;
    }
    return response;
  }

  async update(data: any) {
    const response = await this.api.update(`${this.endpoint}`, data);
    return response;
  }

}
