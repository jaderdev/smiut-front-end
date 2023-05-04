import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MongoClient } from 'mongodb';

@Injectable({
  providedIn: 'root'
})
export class MongodbService {
  database: any;
  mongoClient: any;
  constructor() {
    this.mongoClient = new MongoClient(environment.mongodb.uri)
    this.database = environment.mongodb.database
   }

   async connect() {
    try {
            return await this.mongoClient.connect();
        } catch (e) {
            console.error("Error");
            console.error(e);
        }
        finally {
        	await this.mongoClient.close();
        }
    }

    async recoverSensores(topic:string){
        return this.connect().then(c=>{
            c.db(this.database).collection(topic).find({}).limit(5);
        })
    }
}
