import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TermsycPage } from './termsyc.page';

const routes: Routes = [
  {
    path: '',
    component: TermsycPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TermsycPageRoutingModule {}
