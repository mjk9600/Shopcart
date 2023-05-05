import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './addproduct/addproduct.component';
import { CustomerComponent } from './customer/customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { ProductconfigComponent } from './productconfig/productconfig.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {component:DashboardComponent,path:'dashbord'},
 {component:LoginComponent,path:'login'},
 {component:RegisterComponent,path:'register'},
 {component:HomeComponent,path:'home/:id',canActivate:[AuthGuard]},
 {component:ProductComponent,path:'product/:id',canActivate:[AuthGuard]},
 {component:UserComponent,path:'user/:id',canActivate:[AuthGuard]},
 {component:ProductconfigComponent,path:'prdconfig/:id',canActivate:[AuthGuard]},
 {component:AddproductComponent,path:'addproduct/:id',canActivate:[AuthGuard]},
 {component:CustomerComponent,path:'customer',canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
