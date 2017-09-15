import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Generated class for the BuylistComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'buylist',
  templateUrl: 'buylist.html'
})
export class BuylistComponent {
  @Output()
  clkItem:EventEmitter<any> = new EventEmitter();

  @Input()
  data: any = null;

  constructor() {
  }

  confirmProduce(){
    this.clkItem.emit(this.data);
  }

}
