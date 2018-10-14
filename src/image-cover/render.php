<?php

require_once __DIR__ . '/../lib/render.php';

function abourgeons_18_image_cover( $attributes, $content ) {
  //return null;
  ob_start();
  ?>
    <div class="wp-block-abourgeons-guten-image-cover" >
  <?php  // abourgeons_fall18_render_image_featuring( $attributes );
        abourgeons_fall18_render_responsivemultimedias($attributes);
  ?>
    </div>
  <?php
  return ob_get_clean();

}

register_block_type( 'abourgeons-guten/image-cover', array(
  'render_callback' => 'abourgeons_18_image_cover'
) );
