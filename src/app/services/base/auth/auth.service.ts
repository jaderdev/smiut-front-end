import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private api: ApiService) { }
  info: any;
  async login(user: any) {
    let response = await this.api.post("auth/login", user);
    if (response.message == "success") {
      localStorage.token = response.data.token;
      localStorage.nome = response.data.nome;
      return { access: true, info: response.data };
    }
    return { access: false, messsage: response.data[0].message };
  }
  logout() {

  }

  async verifyToken(token: string) {
    let response = await this.api.post("auth/token");
    if (!response.e) {
      localStorage.nome = response.data.nome;
      localStorage.token = token;
      return { access: true, info: response.data };
    }
    return { access: false, messsage: response.e };
  }
}
