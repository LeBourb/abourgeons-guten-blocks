<?php

function abourgeons_18_fall_two_images( $attributes, $content ) {

  ob_start();

  $image_left = null;
  $image_right = null;
  if(isset($attributes['left_id'])) {
    $image_left = wp_get_attachment_image_src( $attributes['left_id'] , 'woocommerce_single');
  }
  if(isset($attributes['right_id'])) {
    $image_right = wp_get_attachment_image_src( $attributes['right_id'] , 'woocommerce_single');
  }

?>

  <div class="wp-block-abourgeons-guten-t18fall-two-images" >
    <div class="block-left" >
      <div
        <?php if($image_left) { ?>
          style="background-image: url(<?php echo $image_left[0]; ?>);"
        <?php } ?>
          class= "block-img col-xs-12 col-sm-12 col-md-9 col-lg-9"
      ></div>
    </div>
    <div class= "block-right" >
      <div
        <?php if($image_right) { ?>
          style="background-image: url(<?php echo $image_right[0]; ?>);"
        <?php } ?>
          class= "block-img col-xs-12 col-sm-12 col-md-9 col-lg-9"
        ></div>
    </div>
  </div>
<?php
  return ob_get_clean();

}

register_block_type( 'abourgeons-guten/t18fall-two-images', array(
  'render_callback' => 'abourgeons_18_fall_two_images'
) );
