import { Component } from '@angular/core';
import { StoreService } from 'src/app/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'chattycat-admin';

  constructor(public readonly store: StoreService) {
  }
}
