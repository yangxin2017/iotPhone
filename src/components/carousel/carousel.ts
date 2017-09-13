import { Component, Input } from '@angular/core';

/**
 * Generated class for the CarouselComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'carousel',
  templateUrl: 'carousel.html'
})
export class CarouselComponent {
  public _data:any = [];
  @Input()
  public set data(v:any){
    if(v && v.length > 0){
      let d = [];
      
      let ix = 0;
      for(let md of v){
        ix++;
        if(ix <= 3){
          d.push(md);
        }
      }
      this._data = d;
    }
  }
  public get data(){
    return this._data;
  }

  constructor() {
  }

}
