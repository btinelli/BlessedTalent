import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApresentandoPageRoutingModule } from './apresentando-routing.module';

import { ApresentandoPage } from './apresentando.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApresentandoPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [ApresentandoPage]
})
export class ApresentandoPageModule { }
