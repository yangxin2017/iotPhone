import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AppProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AppProvider {

  constructor(
    public storage:Storage
  ) {
  }

  public getToken(){
    return this.storage.get('token');
  }

}
