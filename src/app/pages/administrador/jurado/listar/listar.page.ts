import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { ModalController } from '@ionic/angular';
import { AdicionarPage } from '../adicionar/adicionar.page';
import { EditarPage } from '../editar/editar.page';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  jurados = []
  public filtro: string
  constructor(private router: Router,
    private service: BaseService,
    private toast: ToastComponent,
    public modalController: ModalController) { }

  ngOnInit() {
    this.listarJurados()
  }

  listarJurados() {
    this.service.listarJurados().subscribe(jurados => {
      this.jurados = jurados
    }, error => {
      this.toast.error('Erro ao recuperar jurados')
      console.error(error)
    })
  }



  async presentModalAdd() {
    const modal = await this.modalController.create({
      component: AdicionarPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentModalEdit(jurado) {
    const modal = await this.modalController.create({
      component: EditarPage,
      componentProps: { jurado },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
