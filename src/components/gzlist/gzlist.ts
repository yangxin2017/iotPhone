import { Component, Output, EventEmitter } from '@angular/core';
import { IotsProvider } from '../../providers/iots/iots';

/**
 * Generated class for the GzlistComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'gzlist',
  templateUrl: 'gzlist.html'
})
export class GzlistComponent {

  public currentSelNum:any = -1;

  public gzlist:any = [];
  public uuit:string = '';

  @Output()
  selGzChange:EventEmitter<any> = new EventEmitter();

  constructor(
    private iserv:IotsProvider
  ) {
    this.gzlist = [];
    this.iserv.getIots('', res=>{
      this.uuit = res.uuid;
      let rs = [];
      for(let k in res.statusMapping){
        rs.push({
          num: k,
          sta: res.statusMapping[k]
        })
      }
      this.gzlist = rs;
    });
  }

  checkGz(ev:any){
    if(ev.sta == 1){
      this.currentSelNum = ev.num;

      this.selGzChange.emit([ev, this.uuit]);
    }
  }

}
