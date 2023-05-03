import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { FunctionsService } from '../functions/functions.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endpoint: string = "users";

  constructor(
    private api: ApiService,
    private fn: FunctionsService
  ) { }

  getAll() {
    let response = this.api.read(this.endpoint);
    return response;
  }
  getItem(id: number) {
    let response = this.api.readId(this.endpoint, id);
    if (!response) {
      this.fn.redirectNoData();
      return;
    }
    return response[0];
  }

  verifyPassword(id: number, password: string) {
    let data = { "password": password }
    let response = this.api.create(`${this.endpoint}/${id}/password`, data);
    return response;
  }
  create(data: any) {
    let response = this.api.create(this.endpoint, data);
    return response;
  }
  update(id: number, data: any) {
    let response = this.api.update(`${this.endpoint}/${id}`, data);
    return response;
  }

  delete(data: any) {
    let response = this.api.delete(`${this.endpoint}/${data}`);
    return response;
  }
}
