import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { StoreService } from 'src/app/store.service';
import { Collection, } from 'src/app/types/collection';

@Component({
  selector: 'app-collection-edit',
  templateUrl: './collection-edit.component.html',
  styleUrls: ['./collection-edit.component.sass']
})
export class CollectionEditComponent implements OnInit {
  loading$ = new BehaviorSubject<boolean>(false);
  collection = new Collection();

  constructor(public readonly store: StoreService,
              private readonly route: ActivatedRoute) { }

  updateImage($event: string) {
    this.loading$.next(true);
    this.collection.image = $event;
    this.store.upsert(this.collection).then(
      () => this.loading$.next(false),
      () => this.loading$.next(false),
    );
  }

  ngOnInit(): void {
    this.route.params.pipe(
      pluck('id'),
      map(id => this.store.doc<Collection>('collections', id)),
      tap(collection => {
        if (collection) {
          this.collection = collection;
        }
      })
    ).subscribe();
  }

  save() {
    if (this.collection ) {
      this.loading$.next(true);
      this.store.upsert(this.collection)
        .then(
          update => {
            if (update.id && !this.collection.id) {
              this.collection.id = update.id;
            }
            console.log('success');
            this.loading$.next(false)
          },
          error => {
            console.log('error', {error});
            this.loading$.next(false);
          }
        );
    }
  }

  updateBackground($event: string) {
    this.loading$.next(true);
    this.collection.background = $event;
    this.store.upsert(this.collection).then(
      () => this.loading$.next(false),
      () => this.loading$.next(false),
    );
  }
}

