import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes} from '@angular/router';

import { MainComponent } from './Main/Main.component';
import { HomeoneComponent } from './Pages/Home/HomeOne/HomeOne.component';
//import { HomeTwoComponent } from './Pages/Home/HomeTwo/HomeTwo.component';
//import { HomeThreeComponent } from './Pages/Home/HomeThree/HomeThree.component';
import { CartComponent } from './Pages/Cart/Cart.component';
import { NotFoundComponent } from './Pages/NotFound/NotFound.component';
import {SignInComponent} from './Pages/Session/SignIn/SignIn.component';
import { OrderHistoryComponent } from './Pages/UserAccount/OrderHistory/OrderHistory.component';
//import { ProductsListComponent } from './Pages/Products/ProductsList/ProductsList.component';
import { DetailPageComponent } from './Pages/Products/DetailPage/DetailPage.component';
import { PanelProductsComponent } from './Pages/Products/PanelProducts/PanelProducts.component';
import { AuthGuard } from './Core/guards/auth.guard';

export const AppRoutes : Routes = [

   {
      path : '',
      redirectTo: 'home',
      //component: SignInComponent,
      pathMatch: 'full',
     
   },
   {
      path: 'order-history',
      component: OrderHistoryComponent
   },
   {
      path: 'cart',
      component: CartComponent
   },
   {
      path: 'checkout',
      loadChildren: './Pages/Checkout/Checkout.module#CheckoutModule'
   },                {
      path: 'home/:type/:id',
      component: DetailPageComponent
   },  
 
   { path: 'managetoken', 
   component: SignInComponent,
   //loadChildren: 'app/Modules/login.module#LoginModule'
   },
           
    {
      path : 'home',
      component : MainComponent,
      canActivate:[AuthGuard],
      children: [ 
         //ProductsListComponent
         {
            path : '',
            component : PanelProductsComponent , 
            /*
            children: [
               { 
                  path: ':type', 
                  component: ProductsListComponent 
               },

            ]*/
         },

         /*
         {
            path : 'home-two',
            component : HomeTwoComponent
         },
         {
            path : 'home-three',
            component : HomeThreeComponent
         },*/
         {
          path: 'not-found',
          component: NotFoundComponent
         },
         {
            path: 'session',
            loadChildren: './Pages/Session/Session.module#SessionModule'
         },

         /*
         {
            path: '',
            loadChildren: './Pages/About/About.module#AboutModule'
         },
         {
            path: 'blogs',
            loadChildren: './Pages/Blogs/Blogs.module#BlogsModule'
         },*/     
         {
            path: 'account',
            loadChildren: './Pages/UserAccount/UserAccount.module#UserAccountModule'
         }
      ]
   },
   {
      path: '**',
      redirectTo: 'not-found'
   }
]
