import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the HeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {
  @Input()
  public title:string;
  @Input()
  public showAdd:boolean = false;
  @Output()
  clkAddBut:EventEmitter<any> = new EventEmitter();
  @Input()
  public showLeft:boolean = true;

  constructor(
    public navCtrl: NavController
  ) {
    console.log('Hello HeaderComponent Component');
    this.title = 'Hello World';
  }

  goback(){
    this.navCtrl.pop();
  }

  addInfor(){
    this.clkAddBut.emit('add');
  }

}
