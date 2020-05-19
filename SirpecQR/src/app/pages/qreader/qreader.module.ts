import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QreaderPageRoutingModule } from './qreader-routing.module';

import { QreaderPage } from './qreader.page';

import { NgxQRCodeModule } from 'ngx-qrcode2';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QreaderPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [QreaderPage]
})
export class QreaderPageModule {}
