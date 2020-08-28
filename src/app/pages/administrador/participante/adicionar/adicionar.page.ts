import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseService } from 'src/app/services/base.service';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { Participante } from 'src/app/class/participante.class';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.page.html',
  styleUrls: ['./adicionar.page.scss'],
})
export class AdicionarPage implements OnInit {

  public formParticipante: FormGroup;
  constructor(public modalController: ModalController,
    private formBuilder: FormBuilder,
    private service: BaseService,
    private toast: ToastComponent) { }

  ngOnInit() {
    this.criarFormulario()
  }

  criarFormulario() {
    this.formParticipante = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required])],
      idade: ['', Validators.compose([Validators.required])],
      categoria: ['', Validators.compose([Validators.required])]
    })
  }

  calcularCategoria() {

    let idade = this.formParticipante.value.idade

    if (idade <= 12) {
      this.formParticipante.controls['categoria'].setValue('Kids')
    } else if (idade > 12 && idade <= 16) {
      this.formParticipante.controls['categoria'].setValue('Teen')
    } else if (idade > 16 && idade <= 20) {
      this.formParticipante.controls['categoria'].setValue('Young')
    }

  }

  salvar() {
    let participante = new Participante();
    participante.nome = this.formParticipante.value.nome;
    participante.idade = this.formParticipante.value.idade;
    participante.categoria = this.formParticipante.value.categoria;
    participante.apresentando = 'false';
    this.service.adicionarParticipante(participante).then(res => {
      this.toast.success('Adicionado com sucesso')
      this.dismiss()
    }).catch(error => {
      this.toast.error('Erro ao tentar adicionar')
    })
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
