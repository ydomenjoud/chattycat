import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.sass']
})
export class CollectionsComponent implements OnInit {

  constructor(public readonly store: StoreService) { }

  ngOnInit(): void {
  }

}
