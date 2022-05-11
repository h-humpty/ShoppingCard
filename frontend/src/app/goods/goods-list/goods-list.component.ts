import { Component, OnInit } from '@angular/core';
import { GoodsService } from 'app/services/goods/goods.service';
import { CartService } from 'app/services/cart/cart.service';
import { Goods } from 'app/types/index';
import { CartComponent } from 'app/cart/cart/cart.component';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss'],
  providers: [CartComponent],
})
export class GoodsListComponent implements OnInit {
  goodsList: Goods[] = [];

  constructor(
    private goodsService: GoodsService,
    private cartService: CartService,
    private cartComponent: CartComponent
  ) {}

  ngOnInit(): void {
    this.listGoods();
  }

  listGoods() {
    this.goodsService.listGoods().subscribe((res) => {
      this.goodsList = res;
    });
  }

  addToCart(id: number) {
    this.cartService.addItem({ numbers: 1, goods: id }).subscribe(() => {
      this.cartComponent.getCartList();
    });
  }
}
