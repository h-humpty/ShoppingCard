import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialUIModule } from '../material-ui/material-ui.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, AuthRoutingModule, MaterialUIModule],
  exports: [LoginComponent],
})
export class AuthModule {}
