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

  participantes = []
  public filtro = 'Todos'
  constructor(private router: Router,
    private service: BaseService,
    private toast: ToastComponent,
    public modalController: ModalController) { }

  ngOnInit() {
    this.listarParticipantes()
  }

  listarParticipantes() {
    this.service.listarParticipantes().subscribe(participantes => {
      this.participantes = participantes
    }, error => {
      this.toast.error('Erro ao recuperar participantes')
      console.error(error)
    })
  }

  filtrarParticipantes() {
    this.service.filtrarParticipantes(this.filtro).subscribe(participantes => {
      this.participantes = participantes
    }, error => {
      this.toast.error('Erro ao recuperar participantes')
      console.error(error)
    })
  }


  filtrar() {
    if (this.filtro == 'Todos') {
      this.listarParticipantes()
    } else {
      this.filtrarParticipantes()

    }
  }

  async presentModalAdd() {
    const modal = await this.modalController.create({
      component: AdicionarPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async presentModalEdit(participante) {
    const modal = await this.modalController.create({
      component: EditarPage,
      componentProps: { participante },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

}
