import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoodsRoutingModule } from './goods-routing.module';
import { GoodsListComponent } from './goods-list/goods-list.component';
import { MaterialUIModule } from '../material-ui/material-ui.module';

@NgModule({
  declarations: [GoodsListComponent],
  imports: [CommonModule, GoodsRoutingModule, MaterialUIModule],
  exports: [GoodsListComponent],
})
export class GoodsModule {}
