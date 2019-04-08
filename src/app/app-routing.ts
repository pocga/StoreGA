import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes} from '@angular/router';
import { MainComponent } from './Main/Main.component';
import { HomeoneComponent } from './Pages/Home/HomeOne/HomeOne.component';
import { CartComponent } from './Pages/Cart/Cart.component';
import { NotFoundComponent } from './Pages/NotFound/NotFound.component';
import {SignInComponent} from './Pages/Session/SignIn/SignIn.component';
import { OrderHistoryComponent } from './Pages/UserAccount/OrderHistory/OrderHistory.component';
import { DetailPageComponent } from './Pages/Products/DetailPage/DetailPage.component';
import { PanelProductsComponent } from './Pages/Products/PanelProducts/PanelProducts.component';
import { AuthGuard } from './Core/guards/auth.guard';
import { SignOutComponent } from './Pages/Session/SignOut/sign-out.component';

export const AppRoutes : Routes = [

   {path : '',redirectTo: 'home',pathMatch: 'full'},   
   { path: 'signout', component: SignOutComponent},
   { path : 'home', component : MainComponent, canActivate:[AuthGuard],
      children: [ 
         {path : '',component : PanelProductsComponent},           
         {path: 'not-found',component: NotFoundComponent},
         {path: 'order-history',component: OrderHistoryComponent},
         {path: 'cart',component: CartComponent},
         {path: 'session',loadChildren: './Pages/Session/Session.module#SessionModule'},
         {path: 'account',loadChildren: './Pages/UserAccount/UserAccount.module#UserAccountModule'},
         {path: 'checkout',loadChildren: './Pages/Checkout/Checkout.module#CheckoutModule'}
      ]
   },            
   {path: 'home/:type/:id',component: DetailPageComponent},   
   { path: 'managetoken',component: SignInComponent},  
   {path: '**',redirectTo: 'not-found'}
]
