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

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const firebase = {
  apiKey: "AIzaSyA76iR9V9xmnOdNwKx39kNZCxxSfZE2-G0",
  authDomain: "kanbanfire-fe74f.firebaseapp.com",
  projectId: "kanbanfire-fe74f",
  storageBucket: "kanbanfire-fe74f.appspot.com",
  messagingSenderId: "750804850822",
  appId: "1:750804850822:web:e103dc91cadc47005d9907",
  measurementId: "G-D4SPEFV4DF",
  databaseURL: "https://kanbanfire-fe74f-default-rtdb.europe-west1.firebasedatabase.app/"
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
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ComponentsModule,
    BrowserAnimationsModule,
    BoardPageModule,
    TaskPageModule,
    ConfirmPageModule,
    WordPageModule,
    TestingPageModule,
    CategoryPageModule,
    DragDropModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthenticationService,
    AngularFirestore,
    File,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
