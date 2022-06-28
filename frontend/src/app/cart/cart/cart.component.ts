import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'app/services/cart/cart.service';
import { Cart } from 'app/types/index';
import { Store } from '@ngrx/store';
import { getCart } from 'app/store/actions';
import { Status } from 'app/store/reducer';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  // @ViewChild('rightSidenav') public sidenav: MatSidenav;
  notifierSubscription: Subscription;
  showFiller = false; //?
  cartList: Cart[] = [];
  reducer$: Status;
  constructor(
    private cartService: CartService,
    // private store: Store<{ cartList: Cart[] }>,
    private store: Store<{ reducer: Status }>
  ) {
    this.cartService.getUpdate().subscribe(() => {
      this.getCartList();
    });
  }

  ngOnInit(): void {
    this.getCartList();
    // this.sidenavService.setSidenav(this.sidenav);
  }

  ngOnDestroy() {
    this.notifierSubscription.unsubscribe();
  }

  sendMessage(): void {
    this.cartService.sendUpdate('Refresh');
  }

  getCartList() {
    this.cartService.getCartList().subscribe((res) => {
      // this.store.dispatch(getCart({ cartList: res }));
      this.cartList = res;
      console.log('cartList', this.cartList);
    });
  }

  addToCart(id: number) {
    this.cartService.addItem({ numbers: 1, goods: id }).subscribe(() => {
      this.getCartList();
      this.sendMessage();
    });
  }

  clickDecrease(number: number, id: number) {
    if (number === 1) {
      this.deleteFromCart(id);
    } else {
      this.decreaseFromCart(id);
    }
  }

  decreaseFromCart(id: number) {
    this.cartService.removeItem(id).subscribe((res) => {
      this.getCartList();
      this.sendMessage();
    });
  }

  deleteFromCart(id: number) {
    this.cartService.deleteItem(id).subscribe((res) => {
      this.getCartList();
      this.sendMessage();
    });
  }
}
