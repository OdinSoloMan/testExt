import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '', component: MainComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'grid', component: GridComponent },
      { path: 'weather', component: WeatherComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    //enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
