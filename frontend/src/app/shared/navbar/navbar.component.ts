import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Status } from 'app/store/reducer';
import { login } from 'app/store/actions';
import { AuthService } from 'app/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';
import { CartService } from 'app/services/cart/cart.service';
import { Cart } from 'app/types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() inputSideNav: MatSidenav;
  reducer$: Status;
  notifierSubscription: Subscription;
  cartList: Cart[] = [];

  constructor(
    private route: Router,
    private store: Store<{ reducer: Status }>,
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.store.select('reducer').subscribe((res) => (this.reducer$ = res));
    this.notifierSubscription = this.cartService.getUpdate().subscribe(() => {
      this.getCartList();
    });
  }

  ngOnInit(): void {
    this.getCartList();
  }

  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
  }

  logout() {
    this.store.dispatch(login({ isLogin: false }));
    localStorage.removeItem('token');
    localStorage.removeItem('isStaff');
    this.authService.logout();
    this.route.navigate(['/login']);
  }

  getCartList() {
    this.cartService.getCartList().subscribe((res) => {
      this.cartList = res;

      console.log('refresh', res);
    });
  }
}
