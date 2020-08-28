import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {

  constructor(private toastCtrl: ToastController) { }

  ngOnInit() { }

  async success(msgSuccess: string, duration?: number): Promise<HTMLIonToastElement> {
    const toast = await this.toastCtrl.create({
      message: msgSuccess,
      duration: duration || 6000,
      translucent: true,
      mode: 'md',
      animated: true,
      position: 'bottom',
      color: 'success'
    })
    await toast.present()
    return toast
  }

  async error(msgError: string, duration?: number): Promise<HTMLIonToastElement> {
    const toast = await this.toastCtrl.create({
      message: msgError,
      duration: duration || 6000,
      translucent: true,
      mode: 'md',
      animated: true,
      position: 'bottom',
      color: 'danger'
    })
    await toast.present()
    return toast
  }

  async info(msgError: string, duration?: number): Promise<HTMLIonToastElement> {
    const toast = await this.toastCtrl.create({
      message: msgError,
      duration: duration || 6000,
      translucent: true,
      mode: 'md',
      animated: true,
      position: 'bottom',
      color: 'warning',
    })
    await toast.present()
    return toast
  }
}
