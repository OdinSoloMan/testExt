import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { HomeComponent } from './home/home.component';
import { InlineEditDemoComponent } from './inline-edit-demo/inline-edit-demo.component';
import { MainComponent } from './main/main.component';
import { NgxchartComponent } from './ngxchart/ngxchart.component';
import { NgxdatatableComponent } from './ngxdatatable/ngxdatatable.component';
import { NgxlitemodalComponent } from './ngxlitemodal/ngxlitemodal.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestComponent } from './test/test.component';
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
      { path: 'test', component: TestComponent },
      { path: 'inline-edit-demo', component: InlineEditDemoComponent },
      {
        path: 'ngx', children: [
          { path: 'chart', component: NgxchartComponent },
          { path: 'datatable', component: NgxdatatableComponent },
          { path: 'litemodal', component: NgxlitemodalComponent },
        ]
      },
    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    //enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
