import {Component, OnInit, AfterViewInit, ViewEncapsulation} from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    console.log("es xdeba")
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
  }
}
