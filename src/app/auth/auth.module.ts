import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterComponent } from './pages/register/register.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    LoginPageComponent,
    RegisterComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule
  ]
})
export class AuthModule { }
