import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { ToastController,LoadingController } from 'ionic-angular';
import { Restangular } from 'ngx-restangular';


/*
  Generated class for the IotsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class IotsProvider {
  public loader:any = null;
  public loaderTime:any = null;
  public uuid:string = 'DFwONv7jUo1VP0jqTMg3kxgyZYQ=';

  constructor(private rest: Restangular, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    
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
    this.showLoading();
    let param = {
        uuid: this.uuid
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
		});
  }

}
