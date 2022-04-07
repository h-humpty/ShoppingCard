import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { MaterialUIModule } from '../material-ui/material-ui.module';

@NgModule({
  declarations: [CartComponent, OrderComponent],
  imports: [CommonModule, CartRoutingModule, MaterialUIModule],
  exports: [CartComponent, OrderComponent],
})
export class CartModule {}
