import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'chattycat-admin';

  constructor(public readonly store: StoreService,
              private readonly router: Router,
              public readonly auth: AngularFireAuth) {
  }

  logout() {
    this.auth.signOut().then(() => this.router.navigateByUrl('/'));
  }
}
