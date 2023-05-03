import { Injectable } from '@angular/core';
import { ApiService } from '../../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private api: ApiService
  ) { }

  getBase64(file) {
    return new Promise(resolve => {
      var reader = new FileReader();
      let aux = file.name.split(".");
      let ext = aux[aux.length - 1]
      reader.onload = function (event) {
        let data = {
          ext: ext,
          file: event.target.result
        }
        resolve(data);
      };
      reader.readAsDataURL(file);
    });
  }

  async uploadFile(path: string, file: any) {
    let response = await this.api.upload(file, path);
  }

}
