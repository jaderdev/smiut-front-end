import { Injectable } from '@angular/core';
import { ApiService } from '../base/api/api.service';
import { FunctionsService } from '../base/functions/functions.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {
  private endpoint: string = "empresas/funcionarios";

  constructor(private api: ApiService, private fn: FunctionsService) { }

  getAllByEmpresa(id: number) {
    let response = this.api.read(`empresas/${id}/funcionarios`);
    return response;
  }

  async getAll() {
    let response = await this.api.read(`funcionarios`);
    return response;
  }
  async getItem(id: number) {
    let response = await this.api.readId(`funcionarios`, id);
    if (!response) {
      this.fn.redirectNoData();
      return;
    }
    return response;
  }
  async create(data: any) {
    let response = await this.api.create(`funcionarios`, data);
    return response;
  }
  async update(id: number, data: any) {
    let response = await this.api.update(`funcionarios/${id}`, data);
    return response;
  }

  async delete(data: any) {
    let response = await this.api.delete(`funcionarios/${data}`);
    return response;
  }
  async verify(data: any) {
    let response = await this.api.post(`exists/funcionarios`, data);
    return response.data;
  }
}
