import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KalSnackbarConfig, KalSnackbarService } from '@kalidea/kaligraphi';
import { BehaviorSubject } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { StoreService } from 'src/app/store.service';
import { Book } from 'src/app/types/book';
import slugify from 'slugify';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookEditComponent implements OnInit {
  book: Book = new Book();
  loading$ = new BehaviorSubject<boolean>(false);
  error = '';

  constructor(public readonly store: StoreService,
              private readonly router: Router,
              private readonly snackbar: KalSnackbarService,
              private readonly route: ActivatedRoute) {
  }

  @HostListener('document:keydown', ['$event'])
  bindKey($event: KeyboardEvent) {

    if ($event.ctrlKey && $event.key === 's') {
      $event.stopPropagation();
      $event.preventDefault();
      this.save();

      if ($event.altKey) {
        console.log('navigat');
        this.router.navigateByUrl('/board');
      }
    }

    if ($event.altKey && $event.key === 'a') {
      this.router.navigateByUrl('/board');
    }

  }

  save() {
    this.error = '';
    if (this.book) {

      const links = (this.book.links || '')
        .split('\n')
        .filter(e => !!e)
        .map(l => l.split(/[|,]/).map(e => e.trim()));

      const error = links.findIndex(a => {
        return a.length != 2 || a[0] === '' || a[1] === '';
      });

      if (error !== -1) {
        const title = `le lien numéro ${error + 1} n'est pas valide`;
        this.snackbar.open(new KalSnackbarConfig({title}));
        return;
      }

      const book = {...this.book, links: links.map(e => e.join('|'))};

      // check title uniqness
      const hasSameName  = b => slugify(b.name) === slugify(book.name) && (b.id !== book.id || !book.id)
      if (this.store.list<Book>('books').some(hasSameName)) {
        const title = `il y a déjà un livre avec ce titre`;
        this.snackbar.open(new KalSnackbarConfig({title}));
      } else {
        this.loading$.next(true);
        this.store.upsert(book)
          .then(
            b => {
              this.book.id = b.id;
              console.log('success');
              this.loading$.next(false);
            },
            error => {
              console.log('error', {error});
              this.loading$.next(false);
            }
          );
      }
    }
  }

  updateImage($event: string) {
    this.loading$.next(true);
    this.book.image = $event;
    this.store.upsert(this.book).then(
      () => this.loading$.next(false),
      () => this.loading$.next(false),
    );
  }

  ngOnInit(): void {
    this.route.params.pipe(
      pluck('id'),
      map(id => this.store.doc<Book>('books', id)),
      tap(book => {
        if (book) {
          if (book.links.length > 0 && !Array.isArray(book.links)) {
            // c'est une string et il faut l'injecter tel quel
          } else {
            // c'est un tableau et il faut le process
            book.links = (book.links || []).join('\n');
          }
          this.book = {...book };
        }
      })
    ).subscribe();
  }
}
