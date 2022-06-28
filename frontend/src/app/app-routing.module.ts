import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './auth/login/login.component';
// import { SidenavService } from './services/sidenav/sidenav.service';

const routes: Routes = [
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [SidenavService],
})
export class AppRoutingModule {}
