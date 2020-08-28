import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';


@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {

  constructor(private loadingCtrl: LoadingController) { }

  ngOnInit() { }

  async presentLoading(message?: string): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({
      message: message || 'Carregando...'
    })
    await loading.present()
    return loading
  }

  async presentLoadingWithOptions(options?: LoadingOptions): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create({
      ...options
    })
    await loading.present()
    return loading
  }


  async dismissLoading() {
    return await this.loadingCtrl.dismiss()
  }


}
