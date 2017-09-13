import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { ToastController,LoadingController } from 'ionic-angular';
import { Restangular } from 'ngx-restangular';

/*
  Generated class for the ProductsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProductsProvider {
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

  public getAllLists(callback){
    this.showLoading();
    let param = {
        iotUuit: this.uuid
    };
    this.rest.all("sales").customGET("v1/products/cust", param).subscribe(res=>{
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

  public getAllMyLists(phone, callback){
    this.showLoading();
    let param = {
        salesId: phone
    };
    this.rest.all("sales").customGET("v1/products/sales", param).subscribe(res=>{
        this.closeLoading();
        callback(res);
		}, (res)=>{
        this.closeLoading();
		    if(res && res.data){
          this.showMessage(res.data.msg);
        }else{
          this.showMessage('服务器响应错误！');
        }
        callback();
		});
  }

  public AddShop(param){
    let url = 'sales/v1/products?';
    for(let k in param){
      url += k + '=' + param[k] + '&';
    }
    return url;
  }

  public AddGood(param, file, callback){
    this.showLoading();
    this.rest.all("sales").customPOST(file, "v1/products", param).subscribe(res=>{
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

  public CloseGz(uuid, unit, callback){
    this.showLoading();
    let param = {
        uuid: this.uuid,
        unit: unit
    };
    this.rest.all("sales").customPOST(null, "v1/products/close", param).subscribe(res=>{
        this.closeLoading();
        callback(res);
		}, (res)=>{
        this.closeLoading();
		    if(res && res.data){
          this.showMessage(res.data.msg);
        }else{
          this.showMessage('服务器响应错误！');
        }
        callback();
		});
  }

}
