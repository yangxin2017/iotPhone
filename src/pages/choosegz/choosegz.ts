import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ChoosegzPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choosegz',
  templateUrl: 'choosegz.html',
})
export class ChoosegzPage {
  public gzMod:any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChoosegzPage');
  }

  onSubmit(){
    this.navCtrl.push('AddgoodPage', {'gzmod': this.gzMod});
  }
  chGz(gz:any){
    let gzMod = gz[0];
    let uuit = gz[1];
    this.gzMod = gz;
  }

  

}
