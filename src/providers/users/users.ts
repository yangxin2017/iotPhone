import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Restangular } from 'ngx-restangular';
import { ToastController,LoadingController } from 'ionic-angular';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UsersProvider {
  public loader:any = null;
  public loaderTime:any = null;

  constructor(private rest: Restangular, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.loader = this.loadingCtrl.create({
      content: "请稍候..."
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

  private showMessage(str:string){
    let toast = this.toastCtrl.create({
      message: str,
      duration: 3000
    });
    toast.present();
  }

  public AddUser(phone:string, passwd:string, isSales:number, callback){
    this.showLoading();
    let param = {
        phone: phone,
        passwd: passwd,
        isSales: isSales
    };
    this.rest.all("sales").customPOST(null, "v1/users", param).subscribe(res=>{
        callback(res);
        this.closeLoading();
		}, ()=>{
        this.closeLoading();
        this.showMessage('服务器响应错误！');
		});
  }

  public Login(phone:string, passwd:string, callback){
    this.showLoading();
    let param = {
        phone: phone,
        passwd: passwd
    };
    this.rest.one("sales").customPOST(null, "v1/users/login", param).subscribe(res=>{
        this.closeLoading();
        console.log(res);
        callback(res);
		}, (res)=>{
      alert(JSON.stringify(res));
        this.closeLoading();
        if(res && res.data){
          this.showMessage(res.data.msg);
        }else{
          this.showMessage('服务器响应错误！');
        }
		});
  }

}
