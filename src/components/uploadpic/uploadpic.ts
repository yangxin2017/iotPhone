import { Component, Output, EventEmitter } from '@angular/core';

import { ActionSheetController } from "ionic-angular";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';

//import { Camera, ImagePicker, Transfer } from "@ionic-native/core";
/**
 * Generated class for the UploadpicComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */

@Component({
  selector: 'uploadpic',
  templateUrl: 'uploadpic.html',
  providers: [ Camera, ImagePicker ]
})
export class UploadpicComponent {
  private options: CameraOptions = {
    quality: 60,
    sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
  private options2: ImagePickerOptions = {
    maximumImagesCount: 6,
    width: 1024,
    height: 1024,
    quality: 60
  };

  @Output()
  selectedPic:EventEmitter<any> = new EventEmitter();

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private imagePicker: ImagePicker
  ) {

  }

  showSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择',
      buttons: [
        {
          text: '拍照',
          handler: () => {
            this.startCamera();
          }
        },
        {
          text: '从手机相册选择',
          handler: () => {
            this.startPhoto();
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }

  public imageDataUrl:any = null;
  // 启动拍照功能
  private startCamera() {
    this.camera.getPicture(this.options).then((imageData) => {
      // 获取成功
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      //alert(imageData)
      this.imageDataUrl = base64Image;
      this.selectedPic.emit(this.imageDataUrl);

    }, (err) => {
      //console.log('获取图片失败');
      alert('获取图片失败');
    });
  }

  private startPhoto(){
    this.imagePicker.getPictures(this.options2).then((results) => {
      for (var i = 0; i < results.length; i++) {
        alert(results[i]);
        
        this.imageDataUrl = results[i];//'data:image/jpeg;base64,' + results[i];
        this.selectedPic.emit(this.imageDataUrl);
      }
    }, (err) => {
      alert('获取图片失败');
    });
  }

}
