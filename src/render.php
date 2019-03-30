<?php

require_once __DIR__ . '/../lib/render.php';


function abourgeons_18_image_cover_text_content( $attributes ) {
  if( isset($attributes['headline']) && !empty($attributes['headline']) )  {
    ?>
    <h3 class="headline"><?php
    wp_print_rich_text_editor($attributes['headline']);
    ?></h3>
  <?php
  }
  if( isset($attributes['subtitle']) && !empty($attributes['subtitle']) )  {
    ?>
    <h4 class="subtitle"><?php
    wp_print_rich_text_editor($attributes['subtitle']);
    ?></h4>
  <?php
  }

  if(isset($attributes['button']) && !empty($attributes['button'])) {
    ?>
    <div class="button"><?php
      wp_print_rich_text_editor($attributes['button']);
  ?></div>
  <?php
  }
}

function abourgeons_18_image_cover( $attributes, $content ) {
  //return null;
  ob_start();
  $MultiMediaResponsive = false;
  if(array_key_exists('MultiMediaResponsive', $attributes) && $attributes['MultiMediaResponsive'])
    $MultiMediaResponsive = true;
  ?>
    <div class="wp-block-abourgeons-guten-image-cover" >
  <?php  // abourgeons_fall18_render_image_featuring( $attributes );
        abourgeons_fall18_render_image_featuring( $attributes , $MultiMediaResponsive, 'abourgeons_18_image_cover_text_content' );
  ?>
    </div>
  <?php
  return ob_get_clean();
}

register_block_type( 'abourgeons-guten/image-cover', array(
  'render_callback' => 'abourgeons_18_image_cover'
) );
