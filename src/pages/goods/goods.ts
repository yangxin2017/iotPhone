import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProductsProvider } from '../../providers/products/products';

/**
 * Generated class for the GoodsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goods',
  templateUrl: 'goods.html',
})
export class GoodsPage {
  public segment:string = "lists";
  public isSeller:boolean = true;
  public datas:any = [];
  public mdatas:any = [];
  public gzstatus:any = [];

  public username:any = null;
  public userphone:any = null;
  public verifynum:any = null;
  public zfcode:any = null;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController,
    private storage: Storage,
    private pserv:ProductsProvider
  ) {
    this.storage.get('isSeller').then(isseller=>{
      this.isSeller = isseller;
      console.log(this.isSeller);
    });
    this.storage.get('username').then(username=>{
      this.username = username;
    });
    this.storage.get('userphone').then(userphone=>{
      this.userphone = userphone;
    });
    this.storage.get('verifynum').then(verifynum=>{
      this.verifynum = verifynum;
    });
    this.storage.get('zfcode').then(zfcode=>{
      this.zfcode = zfcode;
    });

    this.storage.get('token').then((token)=>{
      this.pserv.getAllLists(res=>{
        this.datas = res;
      });
    });
  }

  ionViewDidLoad() {
  }

  clkItem(d:any){
    this.navCtrl.push('GdetailPage', {'data': d});
  }

  segmentChanged(tp:any){
    if(tp._value == 'self'){
      this.mdatas = [];
      this.storage.get('userphone').then(phone=>{
        this.pserv.getAllMyLists(phone, res=>{
          if(res && res.length > 0){
            this.mdatas = res;
          }
        });
      });
    }else if(tp._value == 'status'){
      

    }
    
  }

  addGoods(){
    this.navCtrl.push('ChoosegzPage');
  }

  quitUser(){
    this.navCtrl.setRoot('ChoosePage');
  }

}
