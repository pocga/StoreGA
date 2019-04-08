import { NgModule }   from '@angular/core'; 
import { RouterModule } from '@angular/router';
import { CommonModule }   from '@angular/common';
import { MatButtonModule, 
         MatBadgeModule,
         MatCardModule, 
         MatMenuModule, 
         MatToolbarModule, 
         MatIconModule, 
         MatInputModule, 
         MatDatepickerModule, 
         MatNativeDateModule, 
         MatProgressSpinnerModule,
         MatTableModule, 
         MatExpansionModule, 
         MatSelectModule,
         MatSnackBarModule, 
         MatTooltipModule, 
         MatChipsModule, 
         MatListModule, 
         MatSidenavModule, 
         MatTabsModule, 
         MatProgressBarModule,
         MatCheckboxModule,
         MatSliderModule,
         MatRadioModule,
         MatDialogModule,
         MatGridListModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BarRatingModule } from "ngx-bar-rating";
import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AddToCardButtonComponent } from './AddToCardButton/AddToCardButton.component';
import { ReviewPopupComponent } from './ReviewPopup/ReviewPopup.component';
import { HeaderCartComponent } from './HeaderCart/HeaderCart.component';
import { ConfirmationPopupComponent } from './ConfirmationPopup/ConfirmationPopup.component';
import { PageTitleComponent } from './PageTitle/PageTitle.component';
import { HomePageOneSliderComponent } from './Slider/HomePageOneSlider/HomePageOneSlider.component';
import { ContactFormComponent } from './ContactForm/ContactForm.component';
import { ImgZoomComponent } from './ImgZoom/ImgZoom.component';
import { CommonSignInComponent } from './CommonSignIn/CommonSignIn.component';
import { AppLogoComponent } from './AppLogo/AppLogo.component';
import { ProductCategoryCardComponent } from './ProductCategoryCard/ProductCategoryCard.component';
import { DetailPageComponent } from '../Pages/Products/DetailPage/DetailPage.component';
import { ShopDetailsComponent } from '../Templates/ShopDetails/ShopDetails.component'; 
import { EmbryoService } from '../Services/Embryo.service';
import { PopUpSignoutComponent } from '../Pages/Session/PopUpSignout/PopUpSignout.component';
import { ToastaModule } from 'ngx-toasta';

@NgModule({
   imports: [
      CommonModule,
      RouterModule,
      MatBadgeModule,
      MatButtonModule, 
      FlexLayoutModule,
      MatCardModule, 
      MatMenuModule, 
      MatToolbarModule, 
      MatIconModule, 
      MatInputModule, 
      MatDatepickerModule, 
      MatNativeDateModule, 
      MatProgressSpinnerModule,
      MatTableModule, 
      MatExpansionModule, 
      MatSelectModule, 
      MatSnackBarModule, 
      MatTooltipModule, 
      MatChipsModule, 
      MatListModule, 
      MatSidenavModule, 
      MatTabsModule, 
      MatProgressBarModule,
      MatCheckboxModule,
      MatSliderModule,
      MatRadioModule,
      MatDialogModule,
      MatGridListModule,
      BarRatingModule,
      AgmCoreModule.forRoot({
         apiKey: 'AIzaSyC9PnuRk42kbCPMOvsfHpn40r5SoyN38zI',
         libraries: ['places']
      }),
      FormsModule,
      ReactiveFormsModule,
      ToastaModule.forRoot(),
      SlickCarouselModule
   ],
   declarations: [
      PopUpSignoutComponent,
      ShopDetailsComponent,
      DetailPageComponent ,
      AddToCardButtonComponent,
      ReviewPopupComponent,
      HeaderCartComponent,
      ConfirmationPopupComponent,
      PageTitleComponent,
      HomePageOneSliderComponent,
      ContactFormComponent,
      ImgZoomComponent,
      CommonSignInComponent,
      AppLogoComponent,
      ProductCategoryCardComponent,
   ],
   exports: [
      
      AddToCardButtonComponent,
      HeaderCartComponent,
      PageTitleComponent,
      HomePageOneSliderComponent,
      ContactFormComponent,
      ImgZoomComponent,
      CommonSignInComponent,
      AppLogoComponent,
      ProductCategoryCardComponent,
   ],
   entryComponents : [
      ReviewPopupComponent,
      ConfirmationPopupComponent,
      PopUpSignoutComponent
   ],
   providers: [
      EmbryoService
   ]
})
export class GlobalModule {}
