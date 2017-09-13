import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { ProductsProvider } from '../../providers/products/products';

/**
 * Generated class for the GdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-gdetail',
  templateUrl: 'gdetail.html',
})
export class GdetailPage {
  public detail:any = false;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl:AlertController,
    public pserv:ProductsProvider
  ) {
    this.detail = this.navParams.get('data');
    console.log(this.detail);
  }

  buygood(){
    
    this.pserv.BuyGz(this.detail.iotUuit, this.detail.iotUnit, this.detail.salesId, res=>{
      this.GotoZf();
    });
  }

  GotoZf(){
    let alert = this.alertCtrl.create({
      title: '成功！',
      subTitle: '订单提交成功，去支付！',
      buttons: [
        {
          text: '确定',
          handler: () => {
            this.pserv.BuyCallbackGz(this.detail.iotUuit, this.detail.iotUnit, res=>{
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

}
