import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: 'pedido-rapido',
    loadChildren: './pedido-rapido/pedido-rapido.module#PedidoRapidoPageModule'
  },
  {
    path: 'to-pdf-page',
    loadChildren: './to-pdf-page/to-pdf-page.module#ToPDFPagePageModule'
  },
  { 
    path: 'new-tms', 
    loadChildren: './new-tms/new-tms.module#NewTMSPageModule' 
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
