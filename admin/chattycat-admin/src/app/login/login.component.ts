import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { KalSnackbarConfig, KalSnackbarService } from '@kalidea/kaligraphi';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loading = false;
  error = '';

  form = new FormGroup({
    email: new FormControl('contact@chattycat.fr', [Validators.required, Validators.email]),
    password: new FormControl('nV0aZ7jA8kE9rN4d', [Validators.required, Validators.minLength(8)])
  });

  constructor(private readonly auth: AngularFireAuth,
              private snackbar: KalSnackbarService,
              private readonly router: Router) {
  }

  login() {
    this.loading = true;
    const {email, password} = this.form.value;
    this.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.loading = false;
        this.router.navigateByUrl('/board');
      })
      .catch((error) => {
        this.loading = false;
        this.error = error.message;
        this.snackbar.open(new KalSnackbarConfig({
          title: error.message
        }));
        console.log(error);
      });
  }

  ngOnInit(): void {
  }

}
