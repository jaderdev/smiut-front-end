import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { FunctionsService } from '../functions/functions.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private endpoint: string = "settings";

  constructor(
    private api: ApiService,
    private fn: FunctionsService
  ) { }

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
    return response[0];
  }
  async getConfig() {
    let response = await this.api.read(this.endpoint);
    return response[0];
  }

  async getConfigInformacoes() {
    let response = await this.api.read(`${this.endpoint}/informacoes`);
    return response[0];
  }
  async updateInformacoes(data: any) {
    let response = await this.api.update(`${this.endpoint}/informacoes`, data);
    return response;
  }
  async getConfigRedes() {
    let response = await this.api.read(`${this.endpoint}/redes_socias`);
    return response;
  }
  async updateRedes(data: any) {
    let response = await this.api.update(`${this.endpoint}/redes_socias`, data);
    return response;
  }
  async getConfigApi() {
    let response = await this.api.read(`${this.endpoint}/api`);
    return response;
  }
  async updateApi(data: any) {
    let response = await this.api.update(`${this.endpoint}/api`, data);
    return response;
  }

  async getConfigManutencao() {
    let response = await this.api.read(`${this.endpoint}/manutencao`);
    return response[0];
  }
  async updateManutencao(data: any) {
    let response = await this.api.update(`${this.endpoint}/manutencao`, data);
    return response;
  }

  getMyIP() {
    let response = this.api.read(`${this.endpoint}/getMyIP`);
    return response;
  }
}
