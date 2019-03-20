import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TvComponent } from './filter/tv/tv.component';
import { MenuComponent } from './menu/menu.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component:LoginComponent },
  { path: 'menu', component:MenuComponent }
  //{ path: 'TVs', component:TvComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
