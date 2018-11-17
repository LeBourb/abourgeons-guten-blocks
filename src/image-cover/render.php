<?php

require_once __DIR__ . '/../lib/render.php';

function abourgeons_18_image_cover( $attributes, $content ) {
  //return null;
  ob_start();
  $MultiMediaResponsive = false;
  if(array_key_exists('MultiMediaResponsive', $attributes) && $attributes['MultiMediaResponsive'])
    $MultiMediaResponsive = true;
  ?>
    <div class="wp-block-abourgeons-guten-image-cover" >
  <?php  // abourgeons_fall18_render_image_featuring( $attributes );
        abourgeons_fall18_render_image_featuring( $attributes , $MultiMediaResponsive );
  ?>
    </div>
  <?php
  return ob_get_clean();

}

register_block_type( 'abourgeons-guten/image-cover', array(
  'render_callback' => 'abourgeons_18_image_cover'
) );
