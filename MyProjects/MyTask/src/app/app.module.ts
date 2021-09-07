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
import { TestingPage } from './testing/testing.page';
import { TestingPageModule } from './testing/testing.module';


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
    AngularFireModule.initializeApp(environment.firebaseConfig),
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
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthenticationService,
    AngularFirestore,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
