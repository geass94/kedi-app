import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    jQuery(".sell-area .sell-slider").owlCarousel({
      autoPlay: false,
      slideSpeed: 2000,
      pagination: false,
      navigation: false,
      items : 5,
      itemsDesktop : [1199, 4],
      itemsDesktopSmall : [1100, 3],
      itemsTablet: [768, 2],
      itemsMobile : [479, 1],
    });

    jQuery(".sell-off-slider").owlCarousel({
      autoPlay: false,
      slideSpeed: 2000,
      pagination: false,
      navigation: false,
      items : 4,
      itemsDesktop : [1199, 3],
      itemsDesktopSmall : [980, 3],
      itemsTablet: [768, 2],
      itemsMobile : [479, 1],
    });
  }

}
