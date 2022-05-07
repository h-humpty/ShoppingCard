import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsListComponent } from './goods-list/goods-list.component';
import { GoodsManagementComponent } from './admin/goods-management/goods-management.component';
import { AdminTabComponent } from './admin/admin-tab/admin-tab.component';

const routes: Routes = [
  {
    path: '',
    component: GoodsListComponent,
  },
  {
    path: 'admin/goods',
    component: GoodsManagementComponent,
  },
  {
    path: 'admin',
    component: AdminTabComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoodsRoutingModule {}
