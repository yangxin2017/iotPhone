import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IotsProvider } from '../../providers/iots/iots';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ChoosePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose',
  templateUrl: 'choose.html',
  providers: [ BarcodeScanner, IotsProvider ]
})
export class ChoosePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private iots:IotsProvider,
    private alertCtrl: AlertController,
    private storage:Storage
  ) {
  }

  ionViewDidLoad() {}

  getGZStatus(uuid, callback:any){
    let isHave:boolean = true;
    callback(isHave, false);
    /*
    this.iots.getIots(uuid, res=>{
      for(let k in res.statusMapping){
        if(res.statusMapping[k] == 0 || res.statusMapping[k] == 1){
          isHave = true;
          break;
        }
      }
      callback(isHave, res.statusMapping);
    });*/
  }

  ScanEwm(str:string='DFwONv7jUo1VP0jqTMg3kxgyZYQ='){

    this.Scan((str)=>{
      this.storage.set('ewm', str);
      this.buyPage(str);

    });
  }
  ScanEwmSell(str:string='DFwONv7jUo1VP0jqTMg3kxgyZYQ='){

    this.Scan((str)=>{
      this.storage.set('ewm', str);
      this.sellPage(str);

    });
  }

  buyPage(str){
    this.getGZStatus(str, (isHave, data)=>{
      if(!isHave){
        let alert = this.alertCtrl.create({
          title: 'Sorry',
          subTitle: '柜子已售空！',
          buttons: ['确认']
        });
        alert.present();
      }else{
        this.storage.set('isSeller', 0);
        //this.navCtrl.push('BuyregPage');
        this.navCtrl.setRoot('GoodsPage');
      }
    });
  }
  sellPage(str){
    this.getGZStatus(str, (isHave, data)=>{
      if(!isHave){
        let alert = this.alertCtrl.create({
          title: 'Sorry',
          subTitle: '柜子已售空！',
          buttons: ['确认']
        });
        alert.present();
      }else{
        this.storage.set('isSeller', 1);
        this.navCtrl.push('SellregPage');
      }
    });
  }

  Scan(callback){
    this.barcodeScanner.scan().then((barcodeData) => {
      let str = barcodeData.text;
      callback(str);
    }, (err) => {
      alert('扫码失败');
      callback('DFwONv7jUo1VP0jqTMg3kxgyZYQ=')
      //error
    });
  }

}
