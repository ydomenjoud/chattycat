import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KaligraphiModule } from '@kalidea/kaligraphi';
import { environment } from 'src/environments/environment';

import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import dayjs from 'dayjs';
dayjs.extend(localeData);
dayjs.extend(weekday);
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BoardComponent } from './board/board.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { PictureComponent } from './picture/picture.component';
import { AuthorsComponent } from './authors/authors.component';
import { AuthorEditComponent } from './author-edit/author-edit.component';
import { CollectionsComponent } from './collections/collections.component';
import { CollectionEditComponent } from './collection-edit/collection-edit.component';
import { PromptDialogComponent } from './prompt-dialog/prompt-dialog.component';
import { SlidesComponent } from 'src/app/config/slides/slides.component';
import { SlideEditComponent } from './config/slide-edit/slide-edit.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoardComponent,
    BookEditComponent,
    PictureComponent,
    AuthorsComponent,
    AuthorEditComponent,
    CollectionsComponent,
    CollectionEditComponent,
    PromptDialogComponent,
    SlidesComponent,
    SlideEditComponent,
    ConfirmDialogComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    KaligraphiModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
