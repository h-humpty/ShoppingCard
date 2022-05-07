import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialUIModule } from '../material-ui/material-ui.module';
import { StoreModule } from '@ngrx/store';
import { Reducer } from 'app/store/reducer';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    StoreModule.forRoot({ reducer: Reducer }),
    FormsModule,
    AuthRoutingModule,
    MaterialUIModule,
  ],
  exports: [LoginComponent],
})
export class AuthModule {}
