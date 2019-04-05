import { Component, OnInit, Input, OnChanges} from '@angular/core';
import { EmbryoService } from 'src/app/Services/Embryo.service';

@Component({
  selector: 'embryo-HomePageOneSlider',
  templateUrl: './HomePageOneSlider.component.html',
  styleUrls: ['./HomePageOneSlider.component.scss']
})
export class HomePageOneSliderComponent implements OnInit, OnChanges {

   @Input() isRTL : boolean = false;

   slideConfig : any;
   slides: any [];
   constructor(private embryoService:EmbryoService,) { }

   ngOnInit() {
     this.getSlides();
   }

   getSlides(): any {
     this.embryoService.getSlidesImage().subscribe((response) => {
       this.slides = Object.keys(response).map(key => response[key]);
     });
   } 

   

   

   ngOnChanges() {
      this.slideConfig = {
         slidesToShow: 1,
         slidesToScroll:1,
         autoplay: true,
         autoplaySpeed: 2000,
         dots: false,
         rtl: this.isRTL,
         responsive: [
          {
             breakpoint: 768,
             settings: {
                arrows: false,
                slidesToShow: 1
             }
             },
          {
             breakpoint: 480,
             settings: {
                arrows: false,
                slidesToShow: 1
             }
          }
         ]
      };
   }

}
