import { Component, OnInit } from '@angular/core';
import { CartService } from 'app/services/cart/cart.service';
import { Cart } from 'app/types/index';
import { Store } from '@ngrx/store';
import { getCart } from 'app/store/actions';
import { Status } from 'app/store/reducer';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  // cartList: Cart[];
  reducer$: Status;
  constructor(
    private cartService: CartService,
    // private store: Store<{ cartList: Cart[] }>,
    private store: Store<{ reducer: Status }>
  ) {
    this.store.select('reducer').subscribe((res) => (this.reducer$ = res));
  }

  ngOnInit(): void {
    this.getCartList();
  }

  getCartList() {
    this.cartService.getCartList().subscribe((res) => {
      this.store.dispatch(getCart({ cartList: res }));
      console.log('get');
      // this.cartList = res;
    });
  }

  addToCart(id: number) {
    this.cartService
      .addItem({ numbers: 1, goods: id })
      .subscribe(() => this.getCartList());
  }

  removeFromCart(id: number) {
    this.cartService.removeItem(id).subscribe((res) => {
      this.getCartList();
    });
  }
}
