import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BaseService } from 'src/app/services/base.service';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { Jurado } from 'src/app/class/jurado.class';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.page.html',
  styleUrls: ['./adicionar.page.scss'],
})
export class AdicionarPage implements OnInit {

  public formJurado: FormGroup;
  constructor(public modalController: ModalController,
    private formBuilder: FormBuilder,
    private service: BaseService,
    private toast: ToastComponent) { }

  ngOnInit() {
    this.criarFormulario()
  }

  criarFormulario() {
    this.formJurado = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required])]
    })
  }



  salvar() {
    let jurado = new Jurado();
    jurado.nome = this.formJurado.value.nome;

    this.service.adicionarJurado(jurado).then(res => {
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
