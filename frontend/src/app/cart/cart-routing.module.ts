import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartRoutingModule {}
