
$( window ).ready(function() {

  $('.wp-block-abourgeons-guten-product-cover-block button').click(function(event) {
    event.stopPropagation();
    window.location.href = $(this).data('href');
  });


});
