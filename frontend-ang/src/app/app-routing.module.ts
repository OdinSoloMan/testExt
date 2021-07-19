import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BasketComponent } from './basket/basket.component';
import { MenuComponent } from './menu/menu.component';
import { OrdersComponent } from './orders/orders.component';
import { ScoreComponent } from './score/score.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/score',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuComponent,
    children: [
      { path: 'score', component: ScoreComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'basket', component: BasketComponent },
      { path: 'login', component: LoginComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
  }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
