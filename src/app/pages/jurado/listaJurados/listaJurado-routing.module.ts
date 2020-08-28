import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaJuradoPage } from './listaJurado.page';

const routes: Routes = [
  {
    path: '',
    component: ListaJuradoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaJuradoPageRoutingModule { }
