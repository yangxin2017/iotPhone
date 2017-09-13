import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GdetailPage } from './gdetail';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    GdetailPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(GdetailPage),
  ],
})
export class GdetailPageModule {}
