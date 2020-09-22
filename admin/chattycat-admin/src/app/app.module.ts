import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KaligraphiModule } from '@kalidea/kaligraphi';
import { environment } from 'src/environments/environment';

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
    PromptDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
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
