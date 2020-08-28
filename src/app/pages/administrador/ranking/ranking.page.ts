import { BaseService } from './../../../services/base.service';
import { Component, OnInit } from '@angular/core';
import { ToastComponent } from 'src/app/components/toast/toast.component';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  participantes = []
  public filtro = 'Todos'
  constructor(private service: BaseService,
    private toast: ToastComponent) { }

  ngOnInit() {
    this.listarParticipantes()
  }

  listarParticipantes() {
    this.service.listarRanking().subscribe(participantes => {
      this.participantes = participantes
    }, error => {
      this.toast.error('Erro ao recuperar ranking')
      console.error(error)
    })
  }

  filtrar() {
    if (this.filtro == 'Todos') {
      this.listarParticipantes()
    } else {
      this.filtrarRanking()

    }
  }
  filtrarRanking() {
    this.service.filtrarRanking(this.filtro).subscribe(participantes => {
      this.participantes = participantes
    }, error => {
      this.toast.error('Erro ao recuperar participantes')
      console.error(error)
    })
  }

}
