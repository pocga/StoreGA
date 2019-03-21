import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TvComponent } from './filter/tv/tv.component';
import { MenuComponent } from './menu/menu.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ShopComponent } from './shop/shop.component';
import { DataUserComponent } from './data-user/data-user.component';
import { ReserveComponent } from './reserve/reserve.component';
import { CheckOrderComponent } from './check-order/check-order.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [

  { path: '', component:LoginComponent },
  { path: 'menu', component:MenuComponent ,
    children: [
    { path: '', component:HomeComponent } ,
    { path: 'filtros', component:TvComponent }  ,
      ]
  },
  { path: 'shopCar', component:ShopComponent },
  { path: 'datauser', component:DataUserComponent },
  { path: 'reserve', component:ReserveComponent },
  { path: 'checkOrder', component:CheckOrderComponent },

  { path: '', component:MenuComponent ,
  children: [
  { path: 'filtros', component:TvComponent }  ,
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

