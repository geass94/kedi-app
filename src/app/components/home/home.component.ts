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
    console.log("es xdeba");

      /*----------------------------
       jQuery MeanMenu
      ------------------------------ */
      jQuery('.mobile-menu nav').meanmenu({
        meanScreenWidth: "991",
        meanMenuContainer: ".mobile-menu"
      });



      /*----------------------------
       product-slider
      ------------------------------ */
      jQuery(".product-slider").owlCarousel({
        autoPlay: false,
        slideSpeed: 2000,
        pagination: false,
        navigation: false,
        items : 3,
        itemsDesktop : [1199, 3],
        itemsDesktopSmall : [980, 3],
        itemsTablet: [768, 2],
        itemsMobile : [479, 1],
      });

      /*----------------------------
       feature-product-slider
      ------------------------------ */
      jQuery(".feature-product-slider").owlCarousel({
        autoPlay: false,
        slideSpeed: 2000,
        pagination: false,
        navigation: true,
        items : 4,
        itemsDesktop : [1199, 4],
        itemsDesktopSmall : [980, 3],
        itemsTablet: [768, 2],
        itemsMobile : [479, 1],
      });

      /*----------------------------
       new-product-slider
      ------------------------------ */
      jQuery(".new-product-slider").owlCarousel({
        autoPlay: false,
        slideSpeed: 2000,
        pagination: false,
        navigation: true,
        items : 4,
        itemsDesktop : [1199, 4],
        itemsDesktopSmall : [980, 3],
        itemsTablet: [768, 2],
        itemsMobile : [479, 1],
      });

      /*----------------------------
       testimonial-slider
      ------------------------------ */
      jQuery(".testimonial-slider").owlCarousel({
        autoPlay: false,
        slideSpeed: 2000,
        pagination: true,
        navigation: false,
        items : 1,
        itemsDesktop : [1199, 1],
        itemsDesktopSmall : [980, 1],
        itemsTablet: [768, 1],
        itemsMobile : [479, 1],
      });

      /*----------------------------
       sell-slider
      ------------------------------ */
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

      /*----------------------------
       features-home2-slider
      ------------------------------ */
      jQuery(".features-home2-slider").owlCarousel({
        autoPlay: false,
        slideSpeed: 2000,
        pagination: false,
        navigation: true,
        items : 4,
        itemsDesktop : [1199, 3],
        itemsDesktopSmall : [980, 2],
        itemsTablet: [768, 1],
        itemsMobile : [479, 1],
      });

      /*----------------------------
       sell-off-slider
      ------------------------------ */
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

      /*----------------------------
       product-page-slider
      ------------------------------ */
      jQuery(".product-page-slider").owlCarousel({
        autoPlay: false,
        slideSpeed: 2000,
        pagination: false,
        navigation: true,
        items : 3,
        itemsDesktop : [1199, 3],
        itemsDesktopSmall : [980, 3],
        itemsTablet: [768, 2],
        itemsMobile : [479, 2],
      });

      /*----------------------------
      upsell-slider
      ------------------------------ */
      jQuery(".upsell-slider").owlCarousel({
        autoPlay: false,
        slideSpeed: 2000,
        pagination: false,
        navigation: true,
        items : 4,
        itemsDesktop : [1199, 3],
        itemsDesktopSmall : [980, 3],
        itemsTablet: [768, 2],
        itemsMobile : [479, 1],
      });

      /*----------------------------
       related-slider
      ------------------------------ */
      jQuery(".related-slider").owlCarousel({
        autoPlay: false,
        slideSpeed: 2000,
        pagination: false,
        navigation: true,
        items : 4,
        itemsDesktop : [1199, 3],
        itemsDesktopSmall : [980, 3],
        itemsTablet: [768, 2],
        itemsMobile : [479, 1],
      });

      /*----------------------------
       price-slider active
      ------------------------------ */
      jQuery( "#slider-range" ).slider({
        range: true,
        min: 100,
        max: 750,
        values: [ 100, 700 ],
        slide: function( event, ui ) {
          jQuery( "#amount" ).val( "" + ui.values[ 0 ] + " -- " + ui.values[ 1 ] );
        }
      });
      jQuery( "#amount" ).val( "" + jQuery( "#slider-range" ).slider( "values", 0 ) +
        " -- " + jQuery( "#slider-range" ).slider( "values", 1 ) );

      /*----------------------------
       elevateZoom active
      ------------------------------ */
      jQuery(".optima_zoom").elevateZoom({
        gallery: 'optima_gallery',
        cursor: 'pointer',
        galleryActiveClass: "active",
        imageCrossfade: true,
        loadingIcon: ""
      });

      jQuery(".optima_zoom").bind("click", function(e) {
        var ez =   jQuery('.optima_zoom').data('elevateZoom');
        ez.closeAll(); // NEW: This function force hides the lens, tint and window
        jQuery.fancybox(ez.getGalleryList());
        return false;
      });

      /*----------------------------
       cart-plus-minus-button active
      ------------------------------ */
      jQuery(".cart-plus-minus").append('<div class="dec qtybutton"><</div><div class="inc qtybutton">></div>');
      jQuery(".qtybutton").on("click", function() {
        const $button = jQuery(this);
        var oldValue = $button.parent().find("input").val();
        if ($button.text() === ">") {
          var newVal = parseFloat(oldValue) + 1;
        } else {
          // Don't allow decrementing below zero
          if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
          } else {
            newVal = 0;
          }
        }
        $button.parent().find("input").val(newVal);
      });

      /*--------------------------
       scrollUp
      ---------------------------- */
      // Check to see if the window is top if not then display button
      jQuery(window).scroll(function(){
        if (jQuery(this).scrollTop() > 300) {
          jQuery('#scrollUp').fadeIn();
        } else {
          jQuery('#scrollUp').fadeOut();
        }
      });

      // Click event to scroll to top
      jQuery('#scrollUp').click(function(){
        jQuery('html, body').animate({scrollTop : 0}, 800);
        return false;
      });

      /*--------------------------
       tooltip
      ---------------------------- */
      jQuery('[data-toggle="tooltip"]').tooltip();


  }

}
