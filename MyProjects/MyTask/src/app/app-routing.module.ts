import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'black-list',
    loadChildren: () => import('./black-list/black-list.module').then( m => m.BlackListPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./authorization/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./authorization/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./authorization/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./authorization/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'board',
    loadChildren: () => import('./modal/board/board.module').then( m => m.BoardPageModule)
  },
  {
    path: 'task',
    loadChildren: () => import('./modal/task/task.module').then( m => m.TaskPageModule)
  },
  {
    path: 'confirm',
    loadChildren: () => import('./modal/confirm/confirm.module').then( m => m.ConfirmPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
