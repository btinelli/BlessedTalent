import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'jurado',
    loadChildren: () => import('./pages/jurado/listaJurados/listaJurado.module').then(m => m.ListaJuradoPageModule)
  },
  {
    path: 'apresentando',
    loadChildren: () => import('./pages/jurado/apresentando/apresentando.module').then(m => m.ApresentandoPageModule)
  },
  {
    path: 'acesso',
    loadChildren: () => import('./pages/acesso/acesso.module').then(m => m.AcessoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/administrador/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'listar',
    loadChildren: () => import('./pages/administrador/participante/listar/listar.module').then(m => m.ListarPageModule)
  },
  {
    path: 'adicionar',
    loadChildren: () => import('./pages/administrador/participante/adicionar/adicionar.module').then(m => m.AdicionarPageModule)
  },
  {
    path: 'editar',
    loadChildren: () => import('./pages/administrador/participante/editar/editar.module').then(m => m.EditarPageModule)
  },
  {
    path: 'listarJurado',
    loadChildren: () => import('./pages/administrador/jurado/listar/listar.module').then(m => m.ListarPageModule)
  },
  {
    path: 'adicionarJurado',
    loadChildren: () => import('./pages/administrador/jurado/adicionar/adicionar.module').then(m => m.AdicionarPageModule)
  },
  {
    path: 'editarJurado',
    loadChildren: () => import('./pages/administrador/jurado/editar/editar.module').then(m => m.EditarPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/administrador/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'ranking',
    loadChildren: () => import('./pages/administrador/ranking/ranking.module').then( m => m.RankingPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
