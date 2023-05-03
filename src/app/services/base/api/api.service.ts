import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private request = axios.create({
    baseURL: environment.urlAPI,
    timeout: 0,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });

  private headersUpload: any = {
    "Content-Type": "multipart/form-data",
    "Authorization": `Bearer ${localStorage.token}`
  }

  constructor() {
    this.request.interceptors.request.use((request) => {
      const existToken = this.isTokenSetted();
      if (existToken.isSetted) {
        request.headers["Authorization"] = `Bearer ${existToken.token}`;
      }

      return request;
    }, (error) => {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error.message);
    });
  }

  async readId(url: String, id: Number) {
    try {
      let response = await this.request.get(`${url}/${id}`);
      return await (response.data.data);
    } catch (error) {
      const { response } = error;
      const { request, ...errorObject } = response;
      console.error(errorObject.data);
      return errorObject.data
    }
  }
  async read(url: string, params: any = {}) {
    try {
      let response = await this.request.get(url, { params: params });
      return await (response.data.data);
    } catch (error) {
      const { response } = error;
      const { request, ...errorObject } = response;
      console.error(errorObject.data);
      return errorObject.data
    }
  }

  async create(url: string, data: any) {
    try {
      let response = await this.request.post(url, data);
      return await (response.data);
    } catch (error) {
      const { response } = error;
      const { request, ...errorObject } = response;
      console.error(errorObject.data);
      return errorObject.data
    }
  }

  async update(url: string, data: any) {
    try {
      let response = await this.request.patch(url, data);
      return await (response.data);
    } catch (error) {
      const { response } = error;
      const { request, ...errorObject } = response;
      console.error(errorObject.data);
      return errorObject.data
    }
  }

  async post(url: string, data: any = []) {
    try {
      let response = await this.request.post(url, data);
      return await (response.data);
    } catch (error) {
      const { response } = error;
      const { request, ...errorObject } = response;
      console.error(errorObject.data);
      return errorObject.data
    }
  }
  async delete(url: string) {
    try {
      let response = await this.request.delete(url);
      return await (response.data);
    } catch (error) {
      const { response } = error;
      const { request, ...errorObject } = response;
      console.error(errorObject.data);
      return errorObject.data
    }
  }
  async uploadImage(data: any = [], url: string) {
    try {
      var formData = new FormData();

      [...data].forEach(file => formData.append("images[]", file));

      formData.append("pathName", url);

      let response = await axios.post(`${environment.urlAPI}/uploads/images`, formData, {
        headers: this.headersUpload,
      });
      return await (response.data);
    } catch (error) {
      const { response } = error;
      const { request, ...errorObject } = response;
      console.error(errorObject.data);
      return errorObject.data
    }

  }
  async upload(data: any = [], url: string, type = "files", params = []) {
    try {
      var formData = new FormData();
      data.forEach(element => {
        formData.append("files[]", element);
      });
      params.forEach((v, k) => {
        formData.append(params[k], v);
      })

      formData.append("page", url);

      let response = await axios.post(`${environment.urlAPI}/uploads/${type}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.token}`
        },
      });
      return await (response.data);
    } catch (error) {
      const { response } = error;
      const { request, ...errorObject } = response;
      console.error(errorObject.data);
      return errorObject.data
    }
  }
  isTokenSetted() {
    if (localStorage.token) {
      return {
        isSetted: true,
        token: localStorage.getItem('token'),
      };
    }
    return {
      isSetted: false,
      token: '',
    };
  }
}
