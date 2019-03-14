import {Component, OnInit, AfterViewInit, ViewEncapsulation} from '@angular/core';
import {CarouselService} from "../../../services/carousel.service";
import {Carousel} from "../../../models/carousel";
import {deserialize} from "serializer.ts/Serializer";
declare var jQuery: any;
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {
  carousel: Carousel = null;
  private sliderInited = false;
  constructor(private carouselService: CarouselService) { }

  ngOnInit() {
    this.carouselService.getCarouselByArea('homepage-header').subscribe(
      res => {
        this.carousel = deserialize<Carousel>(Carousel, res);
      },
      err => {

      },
      () => {
        // this.initSlider();
      }
    );
  }

  initSlider(f: boolean) {
    if (f) {
      if (!this.sliderInited) {
        console.log("slider chairto")
        jQuery('#nivoslider').nivoSlider({
          effect: 'random',
          slices: 15,
          boxCols: 8,
          boxRows: 4,
          animSpeed: 500,
          pauseTime: 5000,
          startSlide: 0,
          directionNav: true,
          controlNavThumbs: false,
          controlNav: false,
          pauseOnHover: false,
          manualAdvance: false
        });
        this.sliderInited = true;
      }
    }

  }
}
