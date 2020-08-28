import { LoadingComponent } from './loading/loading.component';
import { ToastComponent } from './toast/toast.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [
    ToastComponent,
    LoadingComponent
  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    ToastComponent,
    LoadingComponent
  ],
  providers: [
    ToastComponent,
    LoadingComponent
  ]
})
export class ComponentsModule { }
