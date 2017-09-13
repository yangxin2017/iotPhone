import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeaderComponent } from './header/header';
import { BuylistComponent } from './buylist/buylist';
import { CarouselComponent } from './carousel/carousel';
import { GzlistComponent } from './gzlist/gzlist';
import { UploadpicComponent } from './uploadpic/uploadpic';

@NgModule({
	declarations: [HeaderComponent,
    BuylistComponent,
    CarouselComponent,
    GzlistComponent,
    UploadpicComponent],
	imports: [IonicPageModule],
	exports: [HeaderComponent,
    BuylistComponent,
    CarouselComponent,
    GzlistComponent,
    UploadpicComponent]
})
export class ComponentsModule {}
