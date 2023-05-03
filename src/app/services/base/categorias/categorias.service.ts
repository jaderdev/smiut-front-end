import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { FunctionsService } from '../functions/functions.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private endpoint: string = "categorias";
  private endpointtypes: string = "categorias-tipos";

  constructor(
    private api: ApiService,
    private fn: FunctionsService
  ) { }

  async getAll(params: any = []) {
    let url = this.endpoint;

    if (Object.entries(params).length > 0) {
      url = url + "?" + new URLSearchParams(params).toString();
    }

    let response = await this.api.read(`${url}`);
    return response;
  }
  async getItem(id: number) {
    let response = await this.api.readId(this.endpoint, id);
    if (!response) {
      this.fn.redirectNoData();
      return;
    }
    return response[0];
  }
  async getCategory() {
    let response = await this.api.read(this.endpoint);
    return response;
  }

  async getCategoriesTypes() {
    let response = await this.api.read(this.endpointtypes);
    return response;
  }

  async create(data: any) {
    let response = await this.api.create(this.endpoint, data);
    return response;
  }
  async update(id: number, data: any) {
    let response = await this.api.update(`${this.endpoint}/${id}`, data);
    return response;
  }

  async delete(data: any) {
    let response = await this.api.delete(`${this.endpoint}/${data}`);
    return response;
  }

}
