import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AuthenticationService } from './service/authentication.service';
import { ComponentsModule } from './components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardPage } from './modal/board/board.page';
import { TaskPage } from './modal/task/task.page';
import { BoardPageModule } from './modal/board/board.module';
import { TaskPageModule } from './modal/task/task.module';
import { ConfirmPage } from './modal/confirm/confirm.page';
import { ConfirmPageModule } from './modal/confirm/confirm.module';
import { WordPage } from './modal/word/word.page';
import { WordPageModule } from './modal/word/word.module';
import { TestingPage } from './modal/testing/testing.page';
import { TestingPageModule } from './modal/testing/testing.module';
import { File } from '@ionic-native/file/ngx';
import { CategoryPage } from './modal/category/category.page';
import { CategoryPageModule } from './modal/category/category.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardService } from './service/board.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [
    BoardPage,
    TaskPage,
    ConfirmPage,
    WordPage,
    TestingPage,
    CategoryPage,
  ],
  imports: [
    IonicModule.forRoot({
      mode: 'md',
    }),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ComponentsModule,
    BrowserAnimationsModule,
    BoardPageModule,
    TaskPageModule,
    ConfirmPageModule,
    WordPageModule,
    TestingPageModule,
    CategoryPageModule,
    DragDropModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    File,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
