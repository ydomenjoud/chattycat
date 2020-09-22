import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.sass']
})
export class AuthorsComponent implements OnInit {

  constructor(public readonly store: StoreService) { }

  ngOnInit(): void {
  }

}
