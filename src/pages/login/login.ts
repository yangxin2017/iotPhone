import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UsersProvider } from '../../providers/users/users';

import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public myForm:FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fb:FormBuilder,
    public userv:UsersProvider,
    private storage: Storage
  ) {
    this.myForm = this.fb.group({
        password: ['', Validators.compose([Validators.required])],
        phoneNumber: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onSubmit(ev:any){
    this.storage.get('isSeller').then((isSeller) => {
      //isSeller = 1;
      this.userv.Login(ev.value.phoneNumber, ev.value.password, res=>{
        this.storage.set('userphone', ev.value.phoneNumber);
        this.storage.set('token', res.token);
        //this.storage.set('isSeller', isSeller);
        this.navCtrl.setRoot('GoodsPage');
      });
    
    });
  }

}
