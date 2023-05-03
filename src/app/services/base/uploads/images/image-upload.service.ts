import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private endpoint: string;
  constructor(
    private api: ApiService
  ) { }

  setEndPoint(endpoint: string) {
    this.endpoint = endpoint;
    return this.endpoint;
  }

  getAll(id: number) {
    let response = this.api.readId(`${this.endpoint}/parent`, id);
    return response;
  }

  imgUrlToBase64(url: string) {
    let data = {
      url: url
    }
    let response = this.api.create(`config/imagens/toBase64/`, data);
    return response;
  }

  imgToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  /*   async upload(file: any, path: string, params = []) {
      let response = await this.api.upload(file, path, 'images', params);
    } */
  async upload(file: any, path: string) {
    let response = {
      message: "success",
      data: []
    };
    if (file?.length > 0) {
      response = await this.api.uploadImage(file, path);
    }
    return response;
  }
}
