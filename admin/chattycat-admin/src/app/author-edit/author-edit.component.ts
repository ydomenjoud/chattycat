import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { StoreService } from 'src/app/store.service';
import { Author } from 'src/app/types/author';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.sass']
})
export class AuthorEditComponent implements OnInit {

  loading$ = new BehaviorSubject<boolean>(false);
  author = new Author();

  constructor(public readonly store: StoreService,
              private readonly route: ActivatedRoute) { }

  updateImage($event: string) {
    this.loading$.next(true);
    this.author.image = $event;
    this.store.upsert(this.author).then(
      () => this.loading$.next(false),
      () => this.loading$.next(false),
    );
  }

  ngOnInit(): void {
    this.route.params.pipe(
      pluck('id'),
      map(id => this.store.doc<Author>('authors', id)),
      tap(author => {
        if (author) {
          this.author = author;
        }
        console.log(author);
      })
    ).subscribe();
  }

  save() {
    if (this.author ) {
      this.loading$.next(true);
      this.store.upsert(this.author)
        .then(
          entity => {
            console.log('success');
            this.loading$.next(false);
            this.author = entity;
          },
          error => {
            console.log('error', {error});
            this.loading$.next(false);
          }
        );
    }
  }

}
