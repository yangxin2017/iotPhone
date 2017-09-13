import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { FileUploader } from 'ng2-file-upload';

import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ProductsProvider } from '../../providers/products/products';
/**
 * Generated class for the AddgoodPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addgood',
  templateUrl: 'addgood.html',
})
export class AddgoodPage {
  public previewImgUrl:any = null;
  public myForm:FormGroup;

  public productMod:any = {
    salesId: '',
    description: '',
    file: null,
    price: '',
    iotUuit: '',
    iotUnit: ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fb:FormBuilder,
    public storage:Storage,
    public pserv:ProductsProvider
  ) {
    this.myForm = this.fb.group({
        name: ['', Validators.compose([Validators.required])],
        desc: ['', Validators.compose([Validators.required])],
        price: ['', Validators.compose([Validators.required])],
        isQuit: ['', Validators.compose([])]
    });

    let gzMod = this.navParams.get('gzmod');
    this.productMod.iotUuit = gzMod[1];
    this.productMod.iotUnit = gzMod[0].num;
    this.storage.get('userphone').then(phone=>{
      this.productMod.salesId = phone;
    });

  }

  public uploader:FileUploader = new FileUploader({
    url: '',
    removeAfterUpload: true,
    autoUpload: false,
    method: 'post',
    itemAlias: 'file',
    headers: []
  });

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddgoodPage');
  }

  uploadFile(){
    this.pserv.showLoading();
    this.uploader.queue[0].onSuccess = (response, status, headers) => { 
        this.pserv.closeLoading();    
        if (status == 200) {
            //let tempRes = JSON.parse(response);
            this.pserv.CloseGz('', this.productMod.iotUnit, res=>{
              this.navCtrl.setRoot('GoodsPage');
            });
        }
    };
    this.uploader.queue[0].onError = (response, status, headers):any =>{
        let res = JSON.parse(response);
        this.pserv.showMessage(res.msg);
        this.pserv.closeLoading();
    };
    this.uploader.queue[0].upload(); // 开始上传
  }

  onSubmit(param:any){
    this.productMod.description = param.value.desc;
    this.productMod.price = param.value.price;
    this.uploader.setOptions({
      url: this.pserv.AddShop(this.productMod)
    });
    this.uploadFile();

    //console.log(this.productMod);
  }

  selectedFileOnChange(ev:any){
    let $this = this;
    this.uploader.queue.forEach((q:any, i)=>{
      let reader = new FileReader();
      reader.readAsDataURL(q.some);
      reader.onload = function () {
        $this.previewImgUrl = this.result;
      };
    });
  }

}
