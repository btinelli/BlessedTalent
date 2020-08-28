import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { Jurado } from 'src/app/class/jurado.class';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastComponent } from 'src/app/components/toast/toast.component';

@Component({
  selector: 'app-jurado',
  templateUrl: './listaJurado.page.html',
  styleUrls: ['./listaJurado.page.scss'],
})
export class ListaJuradoPage implements OnInit {

  public formJurado: FormGroup;
  public jurados = []
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private service: BaseService,
    private toast: ToastComponent) { }

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


  escolherJurado(jurado: Jurado) {
    localStorage.setItem('nomeJurado', jurado.nome)
    this.router.navigateByUrl('/apresentando')
  }

}
