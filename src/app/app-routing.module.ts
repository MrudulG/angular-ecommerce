import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OktaAuthModule, OktaCallbackComponent } from '@okta/okta-angular';
import { LoginComponent } from './components/login/login.component';
import myAppConfig from './config/my-app-config';
import OktaAuth from '@okta/okta-auth-js';
import { AuthGuard } from './service/auth-guard';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

const oktaConfig = myAppConfig.oidc;
const oktaAuth = new OktaAuth(oktaConfig);

const routes: Routes = [
  {path: 'order-history', component: OrderHistoryComponent},
  {path: 'login', component: LoginComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:name', component: ProductListComponent},
  {path: 'category/:id' , component: ProductListComponent},
  {path: 'category' , component: ProductListComponent},
  {path: 'products' , component: ProductListComponent},
  // {path: 'products' , component: ProductListComponent, canActivate: [AuthGuard]},
  {path: '' , redirectTo: '/products', pathMatch:'full'},
  // { path: '**', redirectTo: 'products' },
  {path: '**', redirectTo: '/products', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
