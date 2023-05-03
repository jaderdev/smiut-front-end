import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getDatabase, ref, onValue } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  database: any;
  constructor() {
    const app = firebase.initializeApp(environment.firebaseConfig);
    this.database = getDatabase(app);
  }
  getRef(link: string = '/') {
    return ref(this.database, link);
  }
}
