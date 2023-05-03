import { Injectable } from '@angular/core';
import { ApiService } from '../base/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {
  private endpoint: string = "reports";

  constructor(
    private apiService: ApiService
  ) { }

  getLogs(values: any) {
    const response = this.apiService.read(`${this.endpoint}/logs`, values);
    return response;
  }

  getIntervaloTempo(values: any) {
    const response = this.apiService.read(`${this.endpoint}/intervalo`, values);
    return response;
  }
  getMedia(values: any) {
    const response = this.apiService.read(`${this.endpoint}/media`, values);
    return response;
  }
}
