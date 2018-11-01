<?php
require_once  __DIR__ . '/../lib/render.php';

register_block_type( 'abourgeons-guten/product-cover-block', array(
  'render_callback' => 'abourgeons_fall18_woo_product_cover_block'
) );


function abourgeons_fall18_woo_product_cover_block(  $attributes, $content ) {
  ob_start();
  if(isset($attributes['productId']) && wc_get_product($attributes['productId']) ) {
    $product = wc_get_product($attributes['productId']);
    wc_product_display_tile($product);
  }
  return ob_get_clean();
}
