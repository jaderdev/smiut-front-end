import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../base/api/api.service';
import { FunctionsService } from '../base/functions/functions.service';
import { LanguagesService } from '../languages/languages.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private MSG = this.languagesService.messages.enterprises;
  MSG_DELETE_ENTERPRISE_CONFIRM = this.MSG.delete_confirm;
  MSG_DELETE_ENTERPRISE_SENSORS = this.MSG.deleting_sensors;

  private endpoint: string = "empresas";
  private _empresas: any;
  private prod_sulfix: string = environment.prod_sulfix;

  constructor(
    private api: ApiService,
    private fn: FunctionsService,
    private languagesService: LanguagesService
  ) { }

  public get empresas(): any {
    return this._empresas;
  }
  public set empresas(value: any) {
    this._empresas = value;
  }


  async getEmpresasNameForMenu() {
    let response = await this.api.read(`${this.prod_sulfix}/${this.endpoint}`);
    if (response.error) {
      return false;
    }
    response = response.map(a => a = { id: a.id, primeiro_nome: a.primeiro_nome, slug: a.slug })
    this.empresas = response;
    return response;
  }

  async getAll() {
    let response = await this.api.read(this.endpoint);
    return response;
  }
  async getItem(id: number) {
    let response = await this.api.readId(this.endpoint, id);
    if (!response) {
      this.fn.redirectNoData();
      return;
    }
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

  async verify(data: any) {
    let response = await this.api.post(`exists/empresas`, data);
    return response.data;
  }
}
