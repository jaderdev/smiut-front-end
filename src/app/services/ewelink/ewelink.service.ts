import { Injectable } from '@angular/core';
import { ApiService } from '../base/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class EwelinkService {
  private endpoint: string = "devices";

  constructor(
    private api: ApiService
  ) { }

  async getTempUmidValue(deviceid: string) {
    let data = {
      currentHumidity: 0,
      currentTemperature: 0,
      online: 0,
    }
    const response = await this.api.read(`${this.endpoint}/${deviceid}`);

    data.currentHumidity = response.humidity == "unavailable" ? 0 : response.humidity;
    data.currentTemperature = response.temperature == "unavailable" ? 0 : response.temperature;
    data.online = response.online;

    return data;
  }


}
