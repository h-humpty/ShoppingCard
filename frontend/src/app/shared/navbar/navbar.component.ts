import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Status } from 'app/store/reducer';
import { login } from 'app/store/actions';
import { AuthService } from 'app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  reducer$: Status;
  constructor(
    private route: Router,
    private store: Store<{ reducer: Status }>,
    private authService: AuthService
  ) {
    this.store.select('reducer').subscribe((res) => (this.reducer$ = res));
  }

  ngOnInit(): void {}

  logout() {
    this.store.dispatch(login({ isLogin: false }));
    this.authService.logout();
    this.route.navigate(['/login']);
  }
}
