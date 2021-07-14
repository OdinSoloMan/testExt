import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoreComponent } from './score/score.component';
import { MenuComponent } from './menu/menu.component';
import { OrdersComponent } from './orders/orders.component';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [			
    AppComponent,
    ScoreComponent,
    MenuComponent,
    OrdersComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
