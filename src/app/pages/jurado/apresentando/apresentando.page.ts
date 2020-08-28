import { Component, OnInit } from '@angular/core';
import { Participante } from 'src/app/class/participante.class';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { BaseService } from 'src/app/services/base.service';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { Nota } from 'src/app/class/nota.class ';

@Component({
  selector: 'app-apresentando',
  templateUrl: './apresentando.page.html',
  styleUrls: ['./apresentando.page.scss'],
})
export class ApresentandoPage implements OnInit {

  participantes = []
  public formNota: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private service: BaseService,
    private toast: ToastComponent) {

  }

  ngOnInit() {
    this.criarFormulario()
    this.listarParticipantes()
  }

  criarFormulario() {
    this.formNota = this.formBuilder.group({
      nota: ['', Validators.compose([Validators.required])]
    })
  }

  listarParticipantes() {
    this.service.listarApresentando('true').subscribe(participantes => {
      this.participantes = participantes
      console.log(participantes)
    }, error => {
      this.toast.error('Erro ao recuperar participantes')
      console.error(error)
    })
  }

  votar(participante: Participante) {
    let nota = new Nota()
    nota.valor = this.formNota.value.nota
    nota.jurado = localStorage.getItem('nomeJurado')
    this.service.votar(participante, nota).then(res => {

      this.toast.success('Voto salvo com sucesso')

    }).catch(error => {
      this.toast.error('Erro ao votar')
      console.error(error)
    })
  }

}
