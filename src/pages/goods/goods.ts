import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
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
    public alertCtrl:AlertController,
    private pserv:ProductsProvider
  ) {
    this.storage.get('isSeller').then(isseller=>{
      this.isSeller = isseller;
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
    //this.navCtrl.push('GdetailPage', {'data': d});

    this.buygood(d);
  }

  buygood(data){
    
    this.pserv.BuyGz(data.iotUuit, data.iotUnit, data.salesId, res=>{
      this.GotoZf(data);
    });
  }

  GotoZf(data){
    let alert = this.alertCtrl.create({
      title: '成功！',
      subTitle: '订单提交成功，去支付！',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.pserv.BuyCallbackGz(data.iotUuit, data.iotUnit, res=>{
              this.pserv.showMessage('购买成功！');

              setTimeout(()=>{
                this.navCtrl.setRoot('GoodsPage');
              }, 2000);

            });
          }
        }
      ],
      
    });
    alert.present();
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
    this.navCtrl.push('AddgoodPage');
  }

  quitUser(){
    this.navCtrl.setRoot('ChoosePage');
  }

}
