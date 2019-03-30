/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function($) {
  // Lazy-loading
  $( window ).ready(function() {

      var prevScrollY = 0;
    var currentScrollY = 0;
    var prevImg = 0;
    var currentImg= 1;

    function getMatchingIndex(scrollY) {
        //var prevposition_bottom = 0;
        //var prevTarget = 0;
        var currentIndex = 0;
        jQuery('.wp-block-abourgeons-guten-blog-txt .abourgeons_fall18abourgeons_fall18_render_imagefeaturing').each(function (idx, elt) {
          //  idx = jQuery(elt).data('target');
            //prevTarget = jQuery('.blockquote-trigger.trigger[data-target="' + (idx - 1) + '"]');
            //nextTarget = jQuery('.blockquote-trigger.trigger[data-target="' + (idx + 1) + '"]');
            var threshold_min = jQuery(elt).position().top + jQuery(elt).height();
            if (scrollY > threshold_min && currentIndex > 0 ) {
                currentIndex = idx;
            }
            /*else if (prevTarget.length == 0 && scrollY < threshold_min) {
                currentIndex = idx;
                return;
            } else if (nextTarget.length == 0) {
                return;
            }
            prevTarget = threshold_min;*/
          /*  var threshold_max = nextTarget.position().top + nextTarget.height();
            if (scrollY > threshold_min && scrollY <= threshold_max) {
                currentIndex = jQuery(elt).data('target');
            }*/
        });
        return currentIndex;
    }
    var thresholdY = null;

    function imageRound() {
        currentScrollY = window.innerHeight / 2 + window.scrollY;
        //currentIndex = getMatchingIndex(currentScrollY);
        var currentImg = jQuery('.wp-block-abourgeons-guten-blog-txt .abourgeons_fall18abourgeons_fall18_render_imagefeaturing').get(0);
        jQuery('.wp-block-abourgeons-guten-blog-txt .abourgeons_fall18abourgeons_fall18_render_imagefeaturing').each(function (idx, elt) {
            var threshold_min = jQuery(elt).position().top + jQuery(elt).height();
            if (scrollY > threshold_min ) {
                currentImg = jQuery(elt);
            }
        });
        if (currentImg !== prevImg) {
            //jQuery('.image-wrapper.is-loaded').removeClass('active');
            //jQuery('.image-wrapper.is-loaded[data-arrival-index="' + currentIndex + '"]').addClass('active');

            jQuery('.featuring-image-container').html( jQuery(currentImg).clone());
        }
        prevImg = currentImg;

        //if(thresholdY && thresholdY > window.scrollY) {
          /*  thresholdY = null;
            jQuery('.image-gallery.trigger-target.desktop-only').removeClass('stop-fixed');
        //}
        var bottom_image_gallery_offset = jQuery('.image-gallery.trigger-target.desktop-only').offset().top + jQuery('.image-gallery.trigger-target.desktop-only').height() + 108;
        var section_bottom_offset = jQuery('.qa.section.trigger').offset().top + jQuery('.qa.section.trigger').height();

        if(!thresholdY && bottom_image_gallery_offset >= section_bottom_offset) {
            jQuery('.image-gallery.trigger-target.desktop-only').addClass('stop-fixed');
            thresholdY = window.scrollY;
        }*/

    }

    window.addEventListener('scroll', function () {
        imageRound();
    });
    imageRound();

  });



}(jQuery));
