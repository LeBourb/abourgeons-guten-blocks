/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
(function($) {
// Lazy-loading
$( window ).ready(function() {
    var idx = 0;
    $('.img-lazy-load').each(function(){
        var that = $(this);
        if(that.data('parent-id')) {
            $('#' + that.data('parent-id')).append('<img id="img_highQuality_' + idx + '" src="' + that.data('full-src') + '" style="display:none;">');
        }else {
            that.append('<img id="img_highQuality_' + idx + '" src="' + that.data('full-src') + '" style="display:none;">');
        }

        $("#img_highQuality_" + idx).off().on("load", function() {
            if(!that.hasClass('no-background')) {
                that.css({
                    "background-image" : "url(" + $(this).attr('src') + ")"
                });
            }
            if (that.attr('src') !== '') {
                that.attr('src',$(this).attr('src'));
            }
        });
        idx++;
    });

    $('.img-lazy-load-rest').each(function(){
        var that = $(this);
        if(that.data('media-id') && wp_json_url) {
            jQuery.ajax({
                type: 'GET',
		url: wp_json_url + 'media/' + that.data('media-id'),
		dataType: 'json',
		success: function( response ) {
                    window.console.log( response );
                    if( response && response.media_details && response.media_details.sizes) {
                        var sizes = response.media_details.sizes;
                        for(key in sizes ){
                            that.data('img-' + key, sizes[key].source_url);
                            if(key === 'woocommerce_single') {
                                jQuery('<img id="" src="' + sizes[key].source_url + '" style="display:none;">').load(function(){
                                    console.log(this);
                                    that.css({
                                     'background-image' : 'url(' + sizes[key].source_url + ')'
                                    });
                                    that.addClass('img-loaded');
                                });
                            }
                        }
                    }
                }
            }).fail( function( response ) {
                window.console.log( response );
            } );
        }
    });
});

var classNames = [];
if (navigator.userAgent.match(/(iPad|iPhone|iPod)/i)) classNames.push('device-ios');
if (navigator.userAgent.match(/android/i)) classNames.push('device-android');

var html = document.getElementsByTagName('html')[0];

if (classNames.length) classNames.push('on-device');
if (html.classList) html.classList.add.apply(html.classList, classNames);

}(jQuery));
