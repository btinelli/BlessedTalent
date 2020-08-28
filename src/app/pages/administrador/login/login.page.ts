import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/services/base.service';
import { ToastComponent } from 'src/app/components/toast/toast.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public formLogin: FormGroup;
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private service: BaseService,
    private toast: ToastComponent) { }

  ngOnInit() {
    this.criarFormulario()
  }

  criarFormulario() {
    this.formLogin = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required])]
    })
  }

  entrar() {
    this.service.login(this.formLogin.value.email, this.formLogin.value.senha).then(res => {
      this.router.navigateByUrl('/menu')

    }).catch(err => {
      this.toast.error('Erro ao tentar fazer o login')
    })
  }
}
