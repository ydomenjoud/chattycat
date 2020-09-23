import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { StoreService } from 'src/app/store.service';
import { Book } from 'src/app/types/book';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookEditComponent implements OnInit {
  book: Book = new Book();
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(public readonly store: StoreService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) { }

  @HostListener("document:keydown", ["$event"])
  bindKey($event: KeyboardEvent){

    if ($event.ctrlKey && $event.key === 's') {
      $event.stopPropagation();
      $event.preventDefault();
      this.save();

      if( $event.altKey ) {
        console.log('navigat');
        this.router.navigateByUrl('/board');
      }
    }

    if ($event.altKey && $event.key === 'a') {
      this.router.navigateByUrl('/board');
    }

  }

  save() {
    if (this.book ) {
      this.loading$.next(true);
      this.store.upsert(this.book)
        .then(
          b => {
            this.book.id = b.id;
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

  ngOnInit(): void {
    this.route.params.pipe(
      pluck('id'),
      map(id => this.store.doc<Book>('books', id)),
      tap(book => {
        if (book) {
          this.book = book;
        }
        console.log(book);
      })
    ).subscribe();
  }

  updateImage($event: string) {
    this.loading$.next(true);
    this.book.image = $event;
    this.store.upsert(this.book).then(
      () => this.loading$.next(false),
      () => this.loading$.next(false),
    );
  }
}
