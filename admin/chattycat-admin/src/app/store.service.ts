import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { KalSnackbarConfig, KalSnackbarService } from '@kalidea/kaligraphi';
import firebase from 'firebase/app';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { Base } from 'src/app/types/base';
import { Author } from './types/author';
import { Book } from './types/book';
import { Collection } from './types/collection';
import { Slide } from './types/slide';

interface Store {
  books?: Book[];
  authors?: Author[];
  collections?: Collection[];
  slides?: Collection[];
}

interface Store$ {
  books?: Observable<Book[]>;
  authors?: Observable<Author[]>;
  collections?: Observable<Collection[]>;
  slides?: Observable<Slide[]>;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public readonly allLoaded$ = new BehaviorSubject<boolean>(false);

  private readonly store: Store = {
    books: undefined,
    authors: undefined,
    collections: undefined,
    slides: undefined
  };

  private readonly store$: Store$ = {};

  private subscriptions = {
    books: Subscription.EMPTY,
    authors: Subscription.EMPTY,
    collections: Subscription.EMPTY,
    slides: Subscription.EMPTY
  };

  constructor(private readonly firestore: AngularFirestore,
              private readonly auth: AngularFireAuth,
              private readonly snackbar: KalSnackbarService) {
    this.auth.authState
      .pipe(
        tap(a => {
          if (a) {
            this.subscribe();
          } else {
            this.unsubscribe();
            this.allLoaded$.next(true);
          }
        })
      )
      .subscribe();
  }

  list<T>(key: keyof Store): T[] {
    return this.store[key] as unknown as T[];
  }

  doc<T extends Base>(key: keyof Store, id: string): T {
    return (this.store[key] as unknown as T[])?.find(e => e.id === id);
  }

  notify(title: string) {
    this.snackbar.open(new KalSnackbarConfig({title}));
  }

  delete<T extends Base>(entity: T): Promise<void> {
    return this.firestore
      .doc(`/${entity.type}/${entity.id}`)
      .delete();
  }

  upsert<T extends Base>(entity: T): Promise<T> {
    // clone
    entity = {...entity};
    // @ts-ignore
    if (entity.parution?.toDate) {
      // @ts-ignore
      entity.parution = firebase.firestore.Timestamp.fromDate(entity.parution.toDate());
    }


    if (entity.id) {
      return this.firestore
        .doc(`/${entity.type}/${entity.id}`)
        .update(entity)
        .then(() => {
          this.notify('Mise à jour terminée');
          return entity;
        });
    } else {
      return this.firestore.collection(`/${entity.type}`).add(entity)
        .then(update => {
          entity.id = update.id;
          this.notify('Enregistrement terminée');
          return entity;
        });
    }
  }

  private unsubscribe() {
    ['books', 'authors', 'collections', 'slides'].map(k => {
      this.subscriptions[k]?.unsubscribe();
    });
  }

  private subscribe() {
    ['books', 'authors', 'collections', 'slides'].map(k => {
      // @ts-ignore
      this.store$[k] = this.firestore.collection('/' + k)
        .valueChanges<any>({idField: 'id'})
        .pipe(
          tap(entities => {
            entities.map(e => {
              e.type = k;
              // @ts-ignore
              if (e.parution?.toDate) {
                // @ts-ignore
                e.parution = e.parution.toDate();
              }
              if (!e.name && e.title) {
                e.name = e.title;
              }
            });
            this.store[k] = entities.sort((a, b) => a.name > b.name ? 1 : -1);

            if (this.isAllListLoaded()) {
              this.allLoaded$.next(true);
            }
          }),
          catchError(error => {
            console.log(error);
            this.store[k] = [];
            if (this.isAllListLoaded()) {
              this.allLoaded$.next(true);
            }
            return of(null);
          }),
          shareReplay()
        );
      // @ts-ignore
      this.subscriptions[k] = this.store$[k].subscribe();
    });
  }

  private isAllListLoaded() {
    return this.store.books
      && this.store.authors
      && this.store.collections
      && this.store.slides;
  }
}
