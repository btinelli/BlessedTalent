import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Participante } from 'src/app/class/participante.class';
import { Nota } from 'src/app/class/nota.class ';
import { ParseError } from '@angular/compiler';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  public formParticipante: FormGroup
  public notas: any[]
  constructor(private service: BaseService,
    private toast: ToastComponent,
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private navParam: NavParams,
    private alertController: AlertController) { }

  ngOnInit() {
    this.criarFormulario(this.navParam.get('participante'))
    this.listarNotas(this.navParam.get('participante'))
  }

  criarFormulario(participante: Participante) {
    console.log(participante)
    this.formParticipante = this.formBuilder.group({
      uid: [participante.uid, Validators.compose([Validators.required])],
      nome: [participante.nome, Validators.compose([Validators.required])],
      idade: [participante.idade, Validators.compose([Validators.required])],
      categoria: [participante.categoria, Validators.compose([Validators.required])],
      apresentando: [participante.apresentando, Validators.compose([Validators.required])]
    })
  }

  listarNotas(participante: Participante) {
    this.service.listarNotas(participante.uid).subscribe((notas: []) => {
      console.log(notas)
      this.notas = notas
    }, err => {
      this.toast.error('Erro ao recuperar notas')
      console.log(err)
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
    participante.uid = this.formParticipante.value.uid
    participante.nome = this.formParticipante.value.nome
    participante.idade = this.formParticipante.value.idade
    participante.categoria = this.formParticipante.value.categoria
    participante.apresentando = this.formParticipante.value.apresentando
    if (this.notas.length > 0) {

      participante.media = this.calculaNotaFinal()
    }
    this.service.alterarParticipante(participante).then(res => {
      this.toast.success('Alterado com sucesso')
      this.dismiss()
    }).catch(error => {
      this.toast.error('Erro ao tentar alterar')
      console.error(error)
    })
  }

  async alertConfirmaExclusao() {
    const alert = await this.alertController.create({
      header: 'Excluir participante',
      message: 'Tem certeza que deseja <strong>excluir</strong> este participante?',
      cssClass: 'myAlert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'warning',
          handler: () => {
          }
        }, {
          text: 'Excluir',
          cssClass: 'warning',
          handler: () => {
            this.excluir();
          }
        }
      ]
    });

    await alert.present();
  }

  excluir() {
    this.service.removerParticipante(this.formParticipante.value.uid).then(() => {
      this.toast.success('Removido com sucesso');
      this.dismiss();
    }).catch(error => {
      console.error('Erro:', error)
      this.toast.error('Erro ao tentar remover')
    })

  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  removerNota(nota: Nota) {
    //this.notas.splice(i, 1);
    this.service.removerNota(this.formParticipante.value.uid, nota.uid).then(res => {
      this.toast.success('Nota removida com sucesso');
    }).catch(err => {
      this.toast.error('Erro ao tentar remover a nota');
    })
  }

  async alertConfirmaExclusaoNota(nota) {
    const alert = await this.alertController.create({
      header: 'Excluir nota',
      message: 'Tem certeza que deseja <strong>excluir</strong> esta nota?',
      cssClass: 'myAlert',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'warning',
          handler: () => {
          }
        }, {
          text: 'Excluir',
          cssClass: 'warning',
          handler: () => {
            this.removerNota(nota);
          }
        }
      ]
    });

    await alert.present();
  }

  calculaNotaFinal() {
    let soma = this.notas.map((nota) => parseInt(nota.valor)).reduce((total, nota) => total += nota)
    return soma / this.notas.length

  }

}
