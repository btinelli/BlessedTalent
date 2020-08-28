import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaJuradoPageRoutingModule } from './listaJurado-routing.module';

import { ListaJuradoPage } from './listaJurado.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaJuradoPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [ListaJuradoPage]
})
export class ListaJuradoPageModule { }
