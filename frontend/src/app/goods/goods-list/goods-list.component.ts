import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../../services/goods/goods.service';
import { Goods } from 'app/types/index';
@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.scss'],
})
export class GoodsListComponent implements OnInit {
  goodsList: Goods[] = [];

  constructor(private GoodsService: GoodsService) {}

  ngOnInit(): void {
    this.listGoods();
  }

  listGoods() {
    this.GoodsService.listGoods().subscribe((res) => {
      this.goodsList = res;
    });
  }
}
