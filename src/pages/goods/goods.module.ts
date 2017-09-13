import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodsPage } from './goods';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    GoodsPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(GoodsPage),
  ],
})
export class GoodsPageModule {}
