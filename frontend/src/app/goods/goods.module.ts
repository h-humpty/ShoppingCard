import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoodsRoutingModule } from './goods-routing.module';
import { GoodsListComponent } from './goods-list/goods-list.component';
import { MaterialUIModule } from '../material-ui/material-ui.module';
import { GoodsManagementComponent } from './admin/goods-management/goods-management.component';
import { FormComponent } from './admin/form/form.component';
import { CategoryComponent } from './admin/category/category.component';
import { AdminTabComponent } from './admin/admin-tab/admin-tab.component';
import { CategoryFormComponent } from './admin/category-form/category-form.component';

@NgModule({
  declarations: [
    GoodsListComponent,
    GoodsManagementComponent,
    FormComponent,
    CategoryComponent,
    AdminTabComponent,
    CategoryFormComponent,
  ],
  imports: [CommonModule, FormsModule, GoodsRoutingModule, MaterialUIModule],
  exports: [GoodsListComponent],
})
export class GoodsModule {}
