import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddgoodPage } from './addgood';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AddgoodPage,
  ],
  imports: [
    CommonModule,
    FileUploadModule,
    ComponentsModule,
    IonicPageModule.forChild(AddgoodPage),
  ],
})
export class AddgoodPageModule {}
