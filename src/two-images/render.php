<?php

function abourgeons_18_fall_two_images( $attributes, $content ) {

?>

  <div class="wp-block-abourgeons-guten-t18fall-two-images" >
    <div class="block-left" >
      <div
          data-url={ left_url }
          data-media-id={ left_id }
          class= "block-img img-lazy-load-rest col-xs-12 col-sm-12 col-md-9 col-lg-9"
        />
    </div>
    <div class= "block-right" >
      <div
          data-url={ right_url }
          data-media-id={ right_id }
          class= "block-img img-lazy-load-rest col-xs-12 col-sm-12 col-md-9 col-lg-9"
        />
    </div>
  </div>


<?php

}

register_block_type( 'abourgeons-guten/two-images', array(
  'render_callback' => 'abourgeons_18_fall_two_images',
) );
