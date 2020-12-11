import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { StoreService } from '../../store.service';
import { Slide } from '../../types/slide';

@Component({
  selector: 'app-slide-edit',
  templateUrl: './slide-edit.component.html',
  styleUrls: ['./slide-edit.component.sass']
})
export class SlideEditComponent implements OnInit {

  loading$ = new BehaviorSubject<boolean>(false);
  slide = new Slide();
  private history: { [key in keyof Slide]?: string[] } = {
    title: [],
    body: [],
  };

  constructor(public readonly store: StoreService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {
  }


  @HostListener('document:keydown', ['$event'])
  bindKey($event: KeyboardEvent) {

    if ($event.ctrlKey && $event.key === 's') {
      $event.stopPropagation();
      $event.preventDefault();
      this.save();

      if ($event.altKey) {
        this.router.navigateByUrl('/slides');
      }
    }

    if ($event.altKey && $event.key === 'a') {
      this.router.navigateByUrl('/slides');
    }

  }

  updateImage($event: string) {
    this.slide.image = $event;
  }

  save() {
    if (this.slide) {
      const id = this.slide.id;
      this.loading$.next(true);
      this.store.upsert(this.slide)
        .then(
          entity => {
            this.loading$.next(false);

            // if had no ID before save, redirect
            if (!id) {
              this.router.navigate(['/slide', 'edit', entity.id]);
            }
            this.slide = entity;
          },
          error => {
            this.loading$.next(false);
          }
        );
    }
  }

  update(property: keyof Slide, element: FocusEvent) {
    const content = (element.target as HTMLElement).textContent;
    const lastEntry = this.history[property][0];
    if (!lastEntry || content !== lastEntry) {
      // save history
      this.history[property].unshift(content);
    }

    // @ts-ignore
    this.slide[property] = content;
  }

  restoreHistory(property: keyof Slide) {
    const lastValue = this.history[property].shift();
    if (lastValue) {
      if (this.slide[property] === lastValue) {
        this.restoreHistory(property);
        return;
      }
      // @ts-ignore
      this.slide[property] = lastValue;
    }
  }

  delete() {
    this.loading$.next(true);
    this.store.delete(this.slide)
      .then(() => {
        this.loading$.next(false);
        this.router.navigate(['/slides']);
      });
  }

  ngOnInit(): void {

    this.route.params.pipe(
      pluck('id'),
      map(id => this.store.doc<Slide>('slides', id)),
      tap(slide => {
        if (slide) {
          this.slide = slide;
        } else {
          this.slide = {
            button: 'Découvrir',
            fontColor: '#FFFFFF',
            body: 'contenu de la slide',
            title: 'Le titre',
            backgroundColor: '#777777',
            url: '',
            type: this.slide.type,
            id: '',
            position: 0
          };
        }
        this.history.title = [this.slide.title];
        this.history.body = [this.slide.body];
      })
    ).subscribe();
  }
}
