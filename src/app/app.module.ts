import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { RestangularModule } from 'ngx-restangular';

import { MyApp } from './app.component';
import { AppProvider } from '../providers/app/app';
import { UsersProvider } from '../providers/users/users';
import { ProductsProvider } from '../providers/products/products';
import { IotsProvider } from '../providers/iots/iots';

export function RestangularConfigFactory (RestangularProvider, appserv) {
  RestangularProvider.setBaseUrl('http://60.205.212.99/');
  RestangularProvider.setDefaultHeaders({'Authorization': ''});

  let token = appserv.getToken();
  token.then((tk) => {
    if(!tk){//
      RestangularProvider.setDefaultHeaders({'Authorization': 'c96bc7f5b851bdb29616e3ecdab29514626f414b76d867aea492abaad9774c7b'});
    }else{
      RestangularProvider.setDefaultHeaders({'Authorization': tk});
    }
  });

  RestangularProvider.addResponseInterceptor((data, operation, what, url, response)=> {
    if(url.indexOf('login') > -1){
      RestangularProvider.setDefaultHeaders({'Authorization': data.token});
    }
    return data;
  });
  
}


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    RestangularModule.forRoot([AppProvider], RestangularConfigFactory),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersProvider,
    AppProvider,
    IotsProvider,
    ProductsProvider
  ]
})
export class AppModule {}
