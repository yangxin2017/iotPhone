import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController) {
    this.detail = this.navParams.get('data');
    console.log(this.detail);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GdetailPage');
  }

  buygood(){
    let alert = this.alertCtrl.create({
      title: '购买成功！',
      subTitle: '购买成功。',
      buttons: ['确定']
    });
    alert.present();
  }

}
