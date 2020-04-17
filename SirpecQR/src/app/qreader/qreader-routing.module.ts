import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QreaderPage } from './qreader.page';

const routes: Routes = [
  {
    path: '',
    component: QreaderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QreaderPageRoutingModule {}
