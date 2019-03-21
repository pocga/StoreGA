import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { FilterComponent } from './filter/filter.component';
import { TvComponent } from './filter/tv/tv.component';
import { LoginComponent } from './login/login.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { Ng5SliderModule } from 'ng5-slider';
import { ShopComponent } from './shop/shop.component';
import { DataUserComponent } from './data-user/data-user.component';
import { ReserveComponent } from './reserve/reserve.component';
import { CheckOrderComponent } from './check-order/check-order.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FilterComponent,
    TvComponent,
    LoginComponent,
    CatalogoComponent,
    ShopComponent,
    DataUserComponent,
    ReserveComponent,
    CheckOrderComponent,
    HomeComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng5SliderModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
