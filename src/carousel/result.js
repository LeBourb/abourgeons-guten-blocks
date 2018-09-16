/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 //jQuery = require('jquery');
 //import $ from 'jquery';
 //require("expose-loader?$!jquery");
 import 'owl.carousel';
 import 'owl.carousel/src/scss/owl.carousel.scss';
 import 'owl.carousel/src/scss/owl.theme.default.scss';
//(function($) {
// Lazy-loading
  $( window ).ready(function() {
    const options = {
    //	autoplay: autoplay,
    //	items: itemsPerPage,
      slideBy: 'page'
    };
    if($('.owl-carousel')) {
      $('.owl-carousel').owlCarousel(options);
    }


  });

//}(jQuery));
