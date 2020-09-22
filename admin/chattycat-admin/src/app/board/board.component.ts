import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/store.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass']
})
export class BoardComponent implements OnInit {

  constructor(public readonly store: StoreService) { }

  ngOnInit(): void {
  }

}
