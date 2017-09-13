import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

/**
 * Generated class for the SellregPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sellreg',
  templateUrl: 'sellreg.html',
})
export class SellregPage {
  public myForm:FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fb:FormBuilder
  ) {
    this.myForm = this.fb.group({
        password: ['', Validators.compose([Validators.required,  Validators.minLength(6)])],
        phoneNumber: ['', Validators.compose([Validators.required, phoneValidator])],
        verifyNumber: ['', Validators.compose([Validators.required, verifyValidator])],
        moneyCode: ['', Validators.compose([Validators.required])],
        username: ['', Validators.compose([Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SellregPage');
  }

  onSubmit(param:any){
    console.log(param.value);

    this.navCtrl.push('ChoosegzPage');
  }

}
export function phoneValidator(control: FormControl): {[key: string]: any} {
	var phoneRegexp = /^1[3|5][0-9]\d{4,8}$/;    
	if (control.value && !phoneRegexp.test(control.value)) {
	    return {invalidPhone: true};
	}
}
export function verifyValidator(control: FormControl): {[key: string]: any} {
	var phoneRegexp = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;    
	if (control.value && !phoneRegexp.test(control.value)) {
	    return {invalidVerify: true};
	}
}
