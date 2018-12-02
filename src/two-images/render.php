<?php

function abourgeons_18_fall_two_images_display_content($attributes) {
  ?>
  <div class="block">
    <h3>
      <?php if(array_key_exists('headline', $attributes))
                  echo wp_print_rich_text_editor($attributes['headline']);
      ?>
    </h3>
  </div>
  <?php
}

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
    <div class="block-left" class= "col-xs-12 col-sm-12 col-md-9 col-lg-9" >
      <?php
        $media_left = array();
        $media_left['media_id'] = array_key_exists('left_id', $attributes) ? $attributes['left_id'] : '';
        $media_left['headline'] = array_key_exists('left_text', $attributes) ? $attributes['left_text'] : '';
        $MultiMediaResponsive = true;
        abourgeons_fall18_render_image_featuring( $media_left , $MultiMediaResponsive , 'abourgeons_18_fall_two_images_display_content' );
      ?>
    </div>
    <div class= "block-right" class= "col-xs-12 col-sm-12 col-md-9 col-lg-9" >
      <?php
        $media_right = array();
        $media_right['media_id'] = $attributes['right_id'];
        $media_left['headline'] = $attributes['right_text'];
        $MultiMediaResponsive = true;
        abourgeons_fall18_render_image_featuring( $media_right , $MultiMediaResponsive, 'abourgeons_18_fall_two_images_display_content' );
      ?>
    </div>
  </div>
<?php
  return ob_get_clean();

}

register_block_type( 'abourgeons-guten/t18fall-two-images', array(
  'render_callback' => 'abourgeons_18_fall_two_images'
) );
