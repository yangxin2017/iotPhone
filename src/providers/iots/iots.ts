import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { ToastController,LoadingController } from 'ionic-angular';
import { Restangular } from 'ngx-restangular';
import { Storage } from '@ionic/storage';


/*
  Generated class for the IotsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class IotsProvider {
  public loader:any = null;
  public loaderTime:any = null;
  public uuid:string = '';

  constructor(private rest: Restangular, public toastCtrl: ToastController, public loadingCtrl: LoadingController, private store:Storage) {
    
  }

  private getEWM(callback){
    this.store.get('ewm').then(ewm=>{
      this.uuid = ewm;
      callback();
    });
  }

  public showLoading(){
    this.loader = this.loadingCtrl.create({
      content: "请稍候..."
    });

    this.loader.present();

    this.loaderTime = setTimeout(() => {
      this.closeLoading();

      this.showMessage('服务器响应时间过长！');
    }, 10000);
  }
  public closeLoading(){
    if(this.loaderTime){
      clearTimeout(this.loaderTime);
    }
    if(this.loader){
      this.loader.dismiss();
    }
  }

  public showMessage(str:string){
    let toast = this.toastCtrl.create({
      message: str,
      duration: 3000
    });
    toast.present();
  }

  public getIots(uuid:string, callback){
    this.getEWM(()=>{
      if(uuid == ''){
        uuid = this.uuid;
      }
      this.showLoading();
      let param = {
          uuid: uuid
      };
      this.rest.all("sales").customGET("v1/iots", param).subscribe(res=>{
          this.closeLoading();
          callback(res);
      }, (res)=>{
        
          this.closeLoading();
          if(res && res.data){
            this.showMessage(res.data.msg);
          }else{
            this.showMessage('服务器响应错误！');
          }
          this.showMessage('服务器响应错误！');
      });
      
    });
    
  }

}
