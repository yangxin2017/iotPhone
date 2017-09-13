import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { Storage } from '@ionic/storage';

import { UsersProvider } from '../../providers/users/users';

/**
 * Generated class for the BuyregPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buyreg',
  templateUrl: 'buyreg.html',
})
export class BuyregPage {
  public myForm:FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fb:FormBuilder,
    public userv:UsersProvider,
    private storage: Storage
  ) {
    this.myForm = this.fb.group({
        password: ['', Validators.compose([Validators.required,  Validators.minLength(6)])],
        phoneNumber: ['', Validators.compose([Validators.required, phoneValidator])],
        username: ['', Validators.compose([Validators.required])]
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuyregPage');
  }

  onSubmit(param:any){
    this.storage.get('isSeller').then((isSeller) => {
      this.userv.AddUser(param.value.phoneNumber, param.value.password, isSeller, res=>{
        this.storage.set('username', param.value.username);
        this.navCtrl.setRoot('LoginPage');
      });
    });
  }

}

export function phoneValidator(control: FormControl): {[key: string]: any} {
	var phoneRegexp = /^1[3|5][0-9]\d{4,8}$/;    
	if (control.value && !phoneRegexp.test(control.value)) {
	    return {invalidPhone: true};
	}
}
