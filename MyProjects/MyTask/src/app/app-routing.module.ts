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
  {
    path: 'word',
    loadChildren: () => import('./modal/word/word.module').then( m => m.WordPageModule)
  },
  {
    path: 'list-categories',
    loadChildren: () => import('./list-categories/list-categories.module').then( m => m.ListCategoriesPageModule)
  },
  {
    path: 'category',
    loadChildren: () => import('./modal/category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'learning',
    loadChildren: () => import('./learning/learning.module').then( m => m.LearningPageModule)
  },
  {
    path: 'transfer-data',
    loadChildren: () => import('./transfer-data/transfer-data.module').then( m => m.TransferDataPageModule)
  },  {
    path: 'task-manager',
    loadChildren: () => import('./task-manager/task-manager.module').then( m => m.TaskManagerPageModule)
  },
  {
    path: 'test-hub',
    loadChildren: () => import('./test-hub/test-hub.module').then( m => m.TestHubPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
