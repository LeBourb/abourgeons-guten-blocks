
$( window ).ready(function() {

  $('.wp-block-abourgeons-guten-product-cover-block button.product_button_footer').click(function(event) {
    event.stopPropagation();
    window.location.href = $(this).data('href');
  });

  $('.wp-block-abourgeons-guten-product-cover-block button.product_button_footer').mouseenter(function(event) {
    event.stopPropagation();
    targetId = $(this).data('id');
    $('#' + targetId).addClass('hover');
  });
  $('.wp-block-abourgeons-guten-product-cover-block button.product_button_footer').mouseleave(function(event) {
    event.stopPropagation();
    targetId = $(this).data('id');
    $('#' + targetId).removeClass('hover');
  });

});
