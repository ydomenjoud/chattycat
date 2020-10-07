import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { KalSnackbarConfig, KalSnackbarService } from '@kalidea/kaligraphi';
import firebase from 'firebase/app';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { Base } from 'src/app/types/base';
import { Author } from './types/author';
import { Book } from './types/book';
import { Collection } from './types/collection';

interface Store {
  books?: Book[];
  authors?: Author[];
  collections?: Collection[];
}

interface Store$ {
  books?: Observable<Book[]>;
  authors?: Observable<Author[]>;
  collections?: Observable<Collection[]>;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public readonly allLoaded$ = new BehaviorSubject<boolean>(false);

  private readonly store: Store = {
    books: undefined,
    authors: undefined,
    collections: undefined
  };

  private readonly store$: Store$ = {};

  constructor(private firestore: AngularFirestore,
              private snackbar: KalSnackbarService) {

    ['books', 'authors', 'collections'].map(k => {
      // @ts-ignore
      this.store$[k] = this.firestore.collection('/' + k)
        .valueChanges<any>({idField: 'id'})
        .pipe(
          tap(entities => {
            entities.map(e => {
              e.type = k;
              // @ts-ignore
              if( e.parution?.toDate) {
                // @ts-ignore
                e.parution = e.parution.toDate();
              }
              if (!e.name && e.title ){
                 e.name = e.title;
              }
            });
            this.store[k] = entities.sort((a,b) => a.name > b.name ? 1 : -1);
            // console.log(k, entities)


            if (this.isAllListLoaded()) {
              this.allLoaded$.next(true);
            }
          }),
          shareReplay()
        );
      // @ts-ignore
      this.store$[k].subscribe();
    });
  }

  list<T>(key: keyof Store): T[] {
    return this.store[key] as unknown as T[];
  }

  doc<T>(key: string, id: string): T {
    return this.store[key].find(e => e.id === id);
  }

  notify(title: string) {
    this.snackbar.open(new KalSnackbarConfig({title}));
  }

  upsert<T extends Base>(entity: T): Promise<T> {
    // clone
    entity = {...entity};
    // @ts-ignore
    if (entity.parution?.toDate) {
      // @ts-ignore
      entity.parution = firebase.firestore.Timestamp.fromDate(entity.parution.toDate());
    }


    if (entity.id ){
      return this.firestore
        .doc(`/${entity.type}/${entity.id}`)
        .update(entity)
        .then( () => {
          this.notify('Mise à jour terminée');
          return entity;
        })
    } else {
      return this.firestore.collection(`/${entity.type}`).add(entity)
        .then( update => {
          entity.id = update.id;
          this.notify('Enregistrement terminée');
          return entity;
        });
    }
  }

  private isAllListLoaded() {
    return this.store.books
      && this.store.authors
      &&  this.store.collections
  }
}
