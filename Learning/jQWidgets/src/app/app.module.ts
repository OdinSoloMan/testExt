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
import { TestComponent } from './test/test.component';
import { NgxchartComponent } from './ngxchart/ngxchart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxdatatableComponent } from './ngxdatatable/ngxdatatable.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxlitemodalComponent } from './ngxlitemodal/ngxlitemodal.component';
import { InlineEditDemoComponent } from './inline-edit-demo/inline-edit-demo.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './main/footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    HeaderComponent,
    GridComponent,
    WeatherComponent,
    TestComponent,
    NgxchartComponent,
    NgxdatatableComponent,
    NgxlitemodalComponent,
    InlineEditDemoComponent,
    FooterComponent,
    PageNotFoundComponent,
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
    NgxChartsModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
