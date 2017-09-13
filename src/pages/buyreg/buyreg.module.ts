import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuyregPage } from './buyreg';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    BuyregPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(BuyregPage),
  ],
})
export class BuyregPageModule {}
