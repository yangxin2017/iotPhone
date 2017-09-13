import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SellregPage } from './sellreg';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SellregPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SellregPage),
  ],
})
export class SellregPageModule {}
