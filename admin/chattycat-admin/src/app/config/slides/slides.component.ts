import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store.service';
import { Slide } from '../../types/slide';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.sass']
})
export class SlidesComponent implements OnInit {

  constructor(public readonly store: StoreService) { }

  ngOnInit(): void {
  }

  sortedList() {
    return this.store.list<Slide>('slides').sort((a, b) => a.position > b.position ? 1 : -1);
  }
}
