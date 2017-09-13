import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChoosegzPage } from './choosegz';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ChoosegzPage,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    IonicPageModule.forChild(ChoosegzPage),
  ],
})
export class ChoosegzPageModule {}
