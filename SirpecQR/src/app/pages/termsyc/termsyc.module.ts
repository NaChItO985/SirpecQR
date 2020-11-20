import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsycPageRoutingModule } from './termsyc-routing.module';

import { TermsycPage } from './termsyc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsycPageRoutingModule
  ],
  declarations: [TermsycPage]
})
export class TermsycPageModule {}
