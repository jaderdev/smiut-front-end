import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import pt from "./data/pt.json";
import en from "./data/en.json";

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  private _messages: any = pt;
  public get messages(): any {
    return this._messages;
  }
  public set messages(value: any) {
    this._messages = value;
  }
  private language = environment.language;
  constructor() {
    switch (this.language) {
      case "pt": this.messages = pt; break;
      case "en": this.messages = en; break;
      default: this.messages = pt; break;
    }
  }
}
