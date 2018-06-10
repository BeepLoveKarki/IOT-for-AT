import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {Serial} from '@ionic-native/serial';
import {TextToSpeech} from '@ionic-native/text-to-speech';
import {HttpClientModule } from '@angular/common/http';
import {IonicStorageModule} from '@ionic/Storage';
import {SpeechRecognition} from '@ionic-native/speech-recognition';
import {Hotspot} from '@ionic-native/hotspot';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {M1Page} from '../pages/m1/m1';
import {SocketIoConfig,SocketIoModule} from 'ng-socket-io';

const config: SocketIoConfig = { url: 'http://192.168.43.29:3000', options: {} };
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    M1Page
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    M1Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Serial,
    TextToSpeech,
    SpeechRecognition,
    Hotspot,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
