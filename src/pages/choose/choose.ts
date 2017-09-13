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
  public uuid:string = '550e8400-e29b-41d4-a716-446655440000';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private iots:IotsProvider,
    private alertCtrl: AlertController,
    private storage:Storage
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoosePage');
  }

  getGZStatus(callback:any){
    let isHave:boolean = false;
    this.iots.getIots(this.uuid, res=>{
      for(let k in res.statusMapping){
        if(res.statusMapping[k] == 0 || res.statusMapping[k] == 1){
          isHave = true;
          break;
        }
      }
      callback(isHave, res.statusMapping);
    });
  }

  buyPage(){
    this.getGZStatus((isHave, data)=>{
      if(!isHave){
        let alert = this.alertCtrl.create({
          title: 'Sorry',
          subTitle: '柜子已售空！',
          buttons: ['确认']
        });
        alert.present();
      }else{
        this.storage.set('isSeller', 0);
        this.navCtrl.push('BuyregPage');
      }
    });
  }
  sellPage(){
    this.navCtrl.push('SellregPage');
  }
  loginPage(){
    this.navCtrl.push('LoginPage');
  }

  Scan(){
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log(JSON.stringify(barcodeData))
    }, (err) => {
      //error
    });
  }

}
