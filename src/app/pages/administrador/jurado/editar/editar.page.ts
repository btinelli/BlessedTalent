import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Jurado } from 'src/app/class/jurado.class';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  public formJurado: FormGroup;
  constructor(private service: BaseService,
    private toast: ToastComponent,
    public modalController: ModalController,
    private formBuilder: FormBuilder,
    private navParam: NavParams,
    private alertController: AlertController) { }

  ngOnInit() {
    this.criarFormulario(this.navParam.get('jurado'))
  }

  criarFormulario(jurado: Jurado) {
    this.formJurado = this.formBuilder.group({
      uid: [jurado.uid, Validators.compose([Validators.required])],
      nome: [jurado.nome, Validators.compose([Validators.required])]
    })
  }



  salvar() {
    let jurado = new Jurado();
    jurado.uid = this.formJurado.value.uid
    jurado.nome = this.formJurado.value.nome

    this.service.alterarJurado(jurado).then(res => {
      this.toast.success('Alterado com sucesso')
      this.dismiss()
    }).catch(error => {
      this.toast.error('Erro ao tentar alterar')
      console.error(error)
    })
  }

  async alertConfirmaExclusao() {
    const alert = await this.alertController.create({
      header: 'Excluir jurado',
      message: 'Tem certeza que deseja <strong>excluir</strong> este jurado?',
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
    this.service.removerJurado(this.formJurado.value.uid).then(() => {
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




}
