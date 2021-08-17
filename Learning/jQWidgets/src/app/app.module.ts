import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { jqxMenuModule } from 'jqwidgets-ng/jqxmenu';
import { jqxCheckBoxModule } from 'jqwidgets-ng/jqxcheckbox';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './main/header/header.component';
import { GridComponent } from './grid/grid.component';
import { jqxGridModule } from 'jqwidgets-ng/jqxgrid';
import { jqxButtonModule } from 'jqwidgets-ng/jqxbuttons';
import { HttpClientModule } from '@angular/common/http';
import { jqxPanelModule } from 'jqwidgets-ng/jqxpanel';
import { WeatherComponent } from './weather/weather.component';
import { jqxChartModule } from 'jqwidgets-ng/jqxchart';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    HeaderComponent,
    GridComponent,
    WeatherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    jqxMenuModule,
    jqxCheckBoxModule,
    jqxGridModule, 
    jqxButtonModule,
    jqxPanelModule,
    jqxChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
