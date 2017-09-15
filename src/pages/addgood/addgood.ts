import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { FileUploader } from 'ng2-file-upload';

import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';

import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ProductsProvider } from '../../providers/products/products';
import { IotsProvider } from '../../providers/iots/iots';
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
  providers: [FileTransfer]
})
export class AddgoodPage {
  public previewImgUrl:any = null;
  public myForm:FormGroup;

  public productMod:any = {
    salesId: '',
    description: '',
    price: '',
    iotUuit: '',
    iotUnit: ''
  };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fb:FormBuilder,
    public storage:Storage,
    public pserv:ProductsProvider,
    public iserv:IotsProvider,
    private transfer: FileTransfer
  ) {
    this.myForm = this.fb.group({
        //name: ['', Validators.compose([Validators.required])],
        gzlists: ['', Validators.compose([Validators.required])],
        desc: ['', Validators.compose([Validators.required])],
        price: ['', Validators.compose([Validators.required])],
        isQuit: ['', Validators.compose([])]
    });

    //let gzMod = this.navParams.get('gzmod');
    //this.productMod.iotUuit = gzMod[1];
    //this.productMod.iotUnit = gzMod[0].num;
    this.storage.get('userphone').then(phone=>{
      this.productMod.salesId = phone;
    });

    this.initGzList();

  }

  public gzlist:any = [];
  initGzList(){
    this.gzlist = [];
    this.iserv.getIots('', res=>{
      this.productMod.iotUuit = res.uuid;
      let rs = [];
      for(let k in res.statusMapping){
        if(res.statusMapping[k] == 1){
          rs.push({
            num: k,
            sta: res.statusMapping[k]
          });
        }
      }
      this.gzlist = rs;
      console.log(rs);
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
    this.productMod.iotUnit = param.value.gzlists;

    //this.productMod.file = this.previewImgUrl;
    var fd = new FormData();
    fd.append('file', this.previewImgUrl, 'temp.jpg');
    
    this.pserv.AddGood(this.productMod, fd, res=>{
      this.pserv.CloseGz('', this.productMod.iotUnit, res=>{
        this.navCtrl.setRoot('GoodsPage');
      });
    });
    /*this.productMod.description = param.value.desc;
    this.productMod.price = param.value.price;
    this.uploader.setOptions({
      url: this.pserv.AddShop(this.productMod)
    });
    this.uploadFile();
    */
    //console.log(this.productMod);
  }

  picSelected(ev:string){
    this.previewImgUrl = this.dataURItoBlob(ev);
  }

  dataURItoBlob(dataURI) {
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = decodeURIComponent(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
  }

  selectedFileOnChange(ev:any){
    let $this = this;
    this.uploader.queue.forEach((q:any, i)=>{
      let reader = new FileReader();
      alert(i);
      reader.readAsDataURL(q.some);
      reader.onload = function () {
        $this.previewImgUrl = this.result;
        alert($this.previewImgUrl);
      };
      reader.onerror = function(ev:any){
        alert(ev.target.error)
      };
    });
  }

}
