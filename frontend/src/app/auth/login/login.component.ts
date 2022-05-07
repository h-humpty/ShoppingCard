import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { login, staff } from 'app/store/actions';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private AuthService: AuthService,
    private route: Router,
    private store: Store<{ isLogin: boolean }>
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.AuthService.login({
      username: this.username,
      password: this.password,
    }).subscribe((res) => {
      this.store.dispatch(login({ isLogin: true }));
      this.store.dispatch(staff({ isStaff: res.isStaff }));
      localStorage.setItem('token', res.access);
      localStorage.setItem('isStaff', JSON.stringify(res.isStaff));
      this.route.navigate(['/']);
    });
  }
}
