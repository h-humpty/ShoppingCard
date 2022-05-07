import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialUIModule } from './material-ui/material-ui.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { GoodsModule } from './goods/goods.module';
import { SharedModule } from './shared/shared.module';
import { InterceptorService } from 'app/services/interceptor/interceptor.service';
import { StoreModule } from '@ngrx/store';
import { Reducer } from 'app/store/reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    StoreModule.forRoot({ reducer: Reducer }),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialUIModule,
    AuthModule,
    CartModule,
    GoodsModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
