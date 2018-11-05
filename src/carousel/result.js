/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 //jQuery = require('jquery');
 //import $ from 'jquery';
 //require("expose-loader?$!jquery");
 import 'owl.carousel';
 //(function($) {
// Lazy-loading
  $( window ).ready(function() {
    const options = {
    //	autoplay: autoplay,
    //	items: itemsPerPage,
    //slideBy: 'page'
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    };
    if($('.owl-carousel.owl-result')) {
      $('.owl-carousel.owl-result').owlCarousel({
        items: $('.owl-carousel').data('items') ? $('.owl-carousel').data('items') : 1,
        slideBy: 'page',
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        autoplay: $('.owl-carousel.owl-result').hasClass('autoplay'),
        nav: true
      });
    }


  });

//}(jQuery));
