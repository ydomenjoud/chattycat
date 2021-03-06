import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';
import { AuthorEditComponent } from 'src/app/author-edit/author-edit.component';
import { AuthorsComponent } from 'src/app/authors/authors.component';
import { BoardComponent } from 'src/app/board/board.component';
import { BookEditComponent } from 'src/app/book-edit/book-edit.component';
import { CollectionEditComponent } from 'src/app/collection-edit/collection-edit.component';
import { CollectionsComponent } from 'src/app/collections/collections.component';
import { SlideEditComponent } from 'src/app/config/slide-edit/slide-edit.component';
import { SlidesComponent } from 'src/app/config/slides/slides.component';
import { LoginComponent } from 'src/app/login/login.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: '', ...canActivate(redirectUnauthorizedToLogin), children: [
      { path: 'board', component: BoardComponent},
      { path: 'book/edit/:id', component: BookEditComponent},

      { path: 'authors', component: AuthorsComponent},
      { path: 'author/edit/:id', component: AuthorEditComponent},

      { path: 'collections', component: CollectionsComponent},
      { path: 'collection/edit/:id', component: CollectionEditComponent},

      { path: 'slides', component: SlidesComponent},
      { path: 'slide/edit/:id', component: SlideEditComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
