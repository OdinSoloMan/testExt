import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCategoriesPageRoutingModule } from './list-categories-routing.module';

import { ListCategoriesPage } from './list-categories.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../components/components.module';
import { MatListModule } from '@angular/material/list';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCategoriesPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    ComponentsModule,
    MatListModule,
  ],
  declarations: [ListCategoriesPage],
})
export class ListCategoriesPageModule {}
