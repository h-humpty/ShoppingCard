import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialUIModule } from '../material-ui/material-ui.module';
import { CartModule } from 'app/cart/cart.module';
import { SharedRoutingModule } from './shared-routing.module';
import { StoreModule } from '@ngrx/store';
import { Reducer } from 'app/store/reducer';
@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    StoreModule.forRoot({ reducer: Reducer }),
    MaterialUIModule,
    SharedRoutingModule,
    CartModule,
  ],
  exports: [NavbarComponent],
})
export class SharedModule {}
