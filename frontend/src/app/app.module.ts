import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUIModule } from './material-ui/material-ui.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { GoodsModule } from './goods/goods.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialUIModule,
    AuthModule,
    CartModule,
    GoodsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
